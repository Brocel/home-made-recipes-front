import { Role } from '../auth/role';
import { UserProfile } from './user-profile';

export interface User {
  id: string;
  email: string;
  roles: Role[];
  profile: UserProfile;
}
