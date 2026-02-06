export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  displayName?: string;
  description?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
