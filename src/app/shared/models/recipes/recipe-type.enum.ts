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
  [RecipeType.STARTER]: 'Entrée', // TODO: translate pipe
  [RecipeType.MAIN_COURSE]: 'Plat principal',
  [RecipeType.DESSERT]: 'Dessert',
  [RecipeType.BEVERAGE]: 'Boisson',
  [RecipeType.SNACK]: 'Snack',
  [RecipeType.APPETIZER]: 'Apéritif',
  [RecipeType.SIDE_DISH]: 'Accompagnement',
};
