export type RegisterRequest = Omit<RegisterForm, 'confirm_password'>;

export interface RegisterForm {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  birth_date: string;
}
