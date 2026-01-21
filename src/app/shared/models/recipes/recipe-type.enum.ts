export enum RecipeType {
  STARTER,
  MAIN_COURSE,
  DESSERT,
  BEVERAGE,
  SNACK,
  APPETIZER,
  SIDE_DISH,
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
