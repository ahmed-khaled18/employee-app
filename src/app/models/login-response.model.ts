export interface Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: string;
}

export interface LoginResponse {
  message: string;
  result: boolean;
  data: Employee | null;
}
