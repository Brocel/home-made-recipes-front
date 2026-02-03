export enum RecipeType {
  STARTER = 'STARTER',
  MAIN_COURSE = 'MAIN_COURSE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
  SNACK = 'SNACK',
  APPETIZER = 'APPETIZER',
  SIDE_DISH = 'SIDE_DISH',
}

export const RecipeTypeLabel: Record<RecipeType, string> = {
  [RecipeType.STARTER]: 'recipeType.starter',
  [RecipeType.MAIN_COURSE]: 'recipeType.mainCourse',
  [RecipeType.DESSERT]: 'recipeType.dessert',
  [RecipeType.BEVERAGE]: 'recipeType.beverage',
  [RecipeType.SNACK]: 'recipeType.snack',
  [RecipeType.APPETIZER]: 'recipeType.apetizer',
  [RecipeType.SIDE_DISH]: 'recipeType.sideDish',
};
