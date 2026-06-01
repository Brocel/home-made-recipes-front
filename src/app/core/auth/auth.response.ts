import { User } from '@models/user/user';

export interface AuthResponse {
  token: string;
  user: User;
}
