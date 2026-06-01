import { Role } from '@models/auth/role';

/**
 * Session user data stored in localStorage for persistence.
 * Contains authentication identity and access control information.
 * - id, username, email: User identity
 * - roles: Decoded from JWT claims for access control (guards, permissions)
 * Excludes sensitive profile data (birthDate, firstName, lastName).
 */
export interface UserSession {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}
