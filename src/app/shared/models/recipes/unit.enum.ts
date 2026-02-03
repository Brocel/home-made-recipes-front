export enum Unit {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  CUP = 'CUP',
  TABLESPOON = 'TABLESPOON',
  TEASPOON = 'TEASPOON',
  PIECE = 'PIECE',
}

export const UnitShortLabel: Record<Unit, string> = {
  [Unit.GRAM]: 'unit.short.gram',
  [Unit.KILOGRAM]: 'unit.short.kilogram',
  [Unit.LITER]: 'unit.short.liter',
  [Unit.MILLILITER]: 'unit.short.milliliter',
  [Unit.CUP]: 'unit.short.cup',
  [Unit.TABLESPOON]: 'unit.short.tablespoon',
  [Unit.TEASPOON]: 'unit.short.teaspoon',
  [Unit.PIECE]: 'unit.short.piece',
};

export const UnitLongLabel: Record<Unit, string> = {
  [Unit.GRAM]: 'unit.full.gram',
  [Unit.KILOGRAM]: 'unit.full.kilogram',
  [Unit.LITER]: 'unit.full.liter',
  [Unit.MILLILITER]: 'unit.full.milliliter',
  [Unit.CUP]: 'unit.full.cup',
  [Unit.TABLESPOON]: 'unit.full.tablespoon',
  [Unit.TEASPOON]: 'unit.full.teaspoon',
  [Unit.PIECE]: 'unit.full.piece',
};
