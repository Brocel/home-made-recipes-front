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
  [RecipeType.STARTER]: 'glossary.recipeType.starter',
  [RecipeType.MAIN_COURSE]: 'glossary.recipeType.mainCourse',
  [RecipeType.DESSERT]: 'glossary.recipeType.dessert',
  [RecipeType.BEVERAGE]: 'glossary.recipeType.beverage',
  [RecipeType.SNACK]: 'glossary.recipeType.snack',
  [RecipeType.APPETIZER]: 'glossary.recipeType.apetizer',
  [RecipeType.SIDE_DISH]: 'glossary.recipeType.sideDish',
};
