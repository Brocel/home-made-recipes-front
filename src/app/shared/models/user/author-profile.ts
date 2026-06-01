import { RecipeDTO } from '@models/recipes/recipe';

/**
 * Public profile information about a recipe author.
 * Used when displaying recipe creator details.
 * Contains only non-sensitive information (no email, dates, or personal data).
 */
export interface AuthorProfile {
  id: string;
  username: string;
  avatar_name?: string;
  inscription_date: string;
  recipes: RecipeDTO[];
}
