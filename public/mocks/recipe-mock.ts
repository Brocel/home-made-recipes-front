import { Recipe, RecipeType, IngredientType, Unit } from '../../src/app/shared/models/recipes/recipe';

export const mockRecipe: Recipe = {
  id: 1,
  title: 'Pâtes crémeuses aux champignons',
  description:
    'Un plat simple, rapide et savoureux, idéal pour un dîner réconfortant. Les champignons sautés se marient parfaitement avec une sauce crémeuse légèrement parfumée à l’ail.',
  preparation_time: 25,
  recipe_type: RecipeType.MAIN_COURSE,
  publication_date: '2024-12-01T10:00:00Z',

  author: {
    id: 'u1',
    first_name: 'Maxime',
    last_name: 'Dupont',
    username: 'maxime',
    email: 'maxime@example.com',
    birth_date: '1990-05-12',
    inscription_date: '2023-01-01',
    roles: [
      {
        id: 1,
        name: 'USER',
      },
    ],
  },

  ingredient_list: [
    {
      id: 1,
      quantity: 200,
      unit: Unit.GRAM,
      product: {
        id: 101,
        name: 'Pâtes',
        ingredient_type: IngredientType.GRAIN,
      },
    },
    {
      id: 2,
      quantity: 150,
      unit: Unit.GRAM,
      product: {
        id: 102,
        name: 'Champignons de Paris',
        ingredient_type: IngredientType.VEGETABLE,
      },
    },
    {
      id: 3,
      quantity: 1,
      unit: Unit.TABLESPOON,
      product: {
        id: 103,
        name: 'Huile d’olive',
        ingredient_type: IngredientType.FAT,
      },
    },
    {
      id: 4,
      quantity: 100,
      unit: Unit.MILLILITER,
      product: {
        id: 104,
        name: 'Crème liquide',
        ingredient_type: IngredientType.DAIRY,
      },
    },
    {
      id: 5,
      quantity: 1,
      unit: Unit.PIECE,
      product: {
        id: 105,
        name: 'Gousse d’ail',
        ingredient_type: IngredientType.VEGETABLE,
      },
    },
    {
      id: 6,
      quantity: 1,
      unit: Unit.TEASPOON,
      product: {
        id: 106,
        name: 'Sel',
        ingredient_type: IngredientType.SPICE,
      },
    },
  ],

  step_list: [
    {
      id: 1,
      order: 1,
      description:
        'Faire cuire les pâtes dans une grande casserole d’eau bouillante salée selon les instructions du paquet.',
    },
    {
      id: 2,
      order: 2,
      description:
        'Pendant ce temps, nettoyer et émincer les champignons.',
    },
    {
      id: 3,
      order: 3,
      description:
        'Faire chauffer l’huile d’olive dans une poêle et y faire revenir l’ail haché pendant 1 minute.',
    },
    {
      id: 4,
      order: 4,
      description:
        'Ajouter les champignons et les faire sauter jusqu’à ce qu’ils soient dorés.',
    },
    {
      id: 5,
      order: 5,
      description:
        'Verser la crème liquide, saler légèrement et laisser mijoter 3 minutes.',
    },
    {
      id: 6,
      order: 6,
      description:
        'Égoutter les pâtes et les mélanger à la sauce. Servir immédiatement.',
    },
  ],
};
