import { Role } from '../auth/role';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  birth_date: string;
  inscription_date: string;
  picture?: string;
  roles: Role[];
}
