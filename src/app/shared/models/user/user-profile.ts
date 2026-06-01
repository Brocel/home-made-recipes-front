/**
 * User profile details for the authenticated user.
 * Lazy-loaded from /auth/me endpoint when user opens profile modal.
 * Contains personally identifiable information (not cached in storage).
 */
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  birth_date: string;
  inscription_date: string;
  avatar?: string;
  recipes: string[]; // List of recipe IDs created by the user
  favorite_recipes: string[]; // List of recipe IDs favorited by the user
}
