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
  [Unit.GRAM]: 'glossary.unit.short.gram',
  [Unit.KILOGRAM]: 'glossary.unit.short.kilogram',
  [Unit.LITER]: 'glossary.unit.short.liter',
  [Unit.MILLILITER]: 'glossary.unit.short.milliliter',
  [Unit.CUP]: 'glossary.unit.short.cup',
  [Unit.TABLESPOON]: 'glossary.unit.short.tablespoon',
  [Unit.TEASPOON]: 'glossary.unit.short.teaspoon',
  [Unit.PIECE]: 'glossary.unit.short.piece',
};

export const UnitLongLabel: Record<Unit, string> = {
  [Unit.GRAM]: 'glossary.unit.full.gram',
  [Unit.KILOGRAM]: 'glossary.unit.full.kilogram',
  [Unit.LITER]: 'glossary.unit.full.liter',
  [Unit.MILLILITER]: 'glossary.unit.full.milliliter',
  [Unit.CUP]: 'glossary.unit.full.cup',
  [Unit.TABLESPOON]: 'glossary.unit.full.tablespoon',
  [Unit.TEASPOON]: 'glossary.unit.full.teaspoon',
  [Unit.PIECE]: 'glossary.unit.full.piece',
};
