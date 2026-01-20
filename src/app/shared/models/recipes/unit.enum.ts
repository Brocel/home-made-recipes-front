export enum Unit {
  GRAM,
  KILOGRAM,
  LITER,
  MILLILITER,
  CUP,
  TABLESPOON,
  TEASPOON,
  PIECE,
}

export const UnitShortLabel: Record<Unit, string> = {
  [Unit.GRAM]: 'Entrée', // TODO: translate pipe
  [Unit.KILOGRAM]: 'Plat principal',
  [Unit.LITER]: 'Dessert',
  [Unit.MILLILITER]: 'Boisson',
  [Unit.CUP]: 'Snack',
  [Unit.TABLESPOON]: 'Apéritif',
  [Unit.TEASPOON]: 'Accompagnement',
  [Unit.PIECE]: 'Accompagnement',
};

export const UnitLongLabel: Record<Unit, string> = {
  [Unit.GRAM]: 'Entrée', // TODO: translate pipe
  [Unit.KILOGRAM]: 'Plat principal',
  [Unit.LITER]: 'Dessert',
  [Unit.MILLILITER]: 'Boisson',
  [Unit.CUP]: 'Snack',
  [Unit.TABLESPOON]: 'Apéritif',
  [Unit.TEASPOON]: 'Accompagnement',
  [Unit.PIECE]: 'Accompagnement',
};
