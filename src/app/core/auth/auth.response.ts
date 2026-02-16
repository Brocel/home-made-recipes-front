import { User } from "../../shared/models/user";

export interface AuthResponse {
  token: string;
  user?: User;
}
