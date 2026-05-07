import { Unit } from '@models/recipes/unit.enum';

export const MOCK_INGREDIENTS = [
  // recipe 1 - salad
  { id: 1, quantity: 2, unit: Unit.PIECE, recipeId: 1, productId: 2 },
  { id: 2, quantity: 5, unit: Unit.GRAM, recipeId: 1, productId: 130 },
  { id: 3, quantity: 10, unit: Unit.MILLILITER, recipeId: 1, productId: 140 },

  // recipe 2 - velouté
  { id: 4, quantity: 2, unit: Unit.PIECE, recipeId: 2, productId: 3 },
  { id: 5, quantity: 1, unit: Unit.PIECE, recipeId: 2, productId: 90 },
  { id: 6, quantity: 20, unit: Unit.MILLILITER, recipeId: 2, productId: 41 },
];
