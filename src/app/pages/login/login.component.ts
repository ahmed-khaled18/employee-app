import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login.model';
import { LoginResponse } from '../../models/login-response.model';
import { BaseComponent } from '../../core/base.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  credentials: LoginCredentials = {
    username: '',
    password: '',
  };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login(this.credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginResponse) => {
          if (response.result) {
            if (response.data) {
              localStorage.setItem(
                'employee_data',
                JSON.stringify(response.data)
              );
              localStorage.setItem('employee_role', response.data.role);
              localStorage.setItem('is_authenticated', 'true');
            }

            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          } else {
            this.isLoading = false;
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message ||
            'Login failed. Please check your credentials.';
          console.error('Login error:', error);
        },
      });
  }
}
