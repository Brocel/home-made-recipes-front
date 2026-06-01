import { MOCK_USERS } from '@mocks/data/users.mocks';
import { Recipe } from '@models/recipes/recipe';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Unit } from '@models/recipes/unit.enum';
import { createIngredient, createRecipe, createSteps } from './seed-factory';

export function seedRecipes(): Recipe[] {
  const admin = MOCK_USERS[0];
  const user1 = MOCK_USERS[1];
  const user2 = MOCK_USERS[2];

  return [
    // -----------------------
    // STARTER
    // -----------------------
    createRecipe({
      title: 'Salade de tomates fraîches',
      description: 'Une salade simple et rafraîchissante.',
      preparation_time: 10,
      recipe_type: RecipeType.STARTER,
      author: admin.profile,
      ingredients: [
        createIngredient(2, Unit.PIECE, 'Tomate'),
        createIngredient(5, Unit.GRAM, 'Basilic'),
        createIngredient(10, Unit.MILLILITER, "Huile d'olive"),
      ],
      steps: createSteps([
        'Couper les tomates en quartiers.',
        "Ajouter le basilic et l'huile d'olive.",
      ]),
    }),

    createRecipe({
      title: 'Velouté de courgettes',
      description: 'Un velouté onctueux.',
      preparation_time: 20,
      recipe_type: RecipeType.STARTER,
      author: user1.profile,
      ingredients: [
        createIngredient(2, Unit.PIECE, 'Courgette'),
        createIngredient(1, Unit.PIECE, 'Oignon'),
        createIngredient(20, Unit.MILLILITER, 'Crème fraîche'),
      ],
      steps: createSteps(['Couper les légumes.', 'Mixer avec la crème.']),
    }),

    // -----------------------
    // MAIN COURSE
    // -----------------------
    createRecipe({
      title: 'Poulet rôti aux herbes',
      description: 'Un poulet tendre.',
      preparation_time: 45,
      recipe_type: RecipeType.MAIN_COURSE,
      author: admin.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Poulet'),
        createIngredient(5, Unit.GRAM, 'Thym'),
        createIngredient(5, Unit.GRAM, 'Romarin'),
      ],
      steps: createSteps(['Assaisonner le poulet.', 'Cuire au four.']),
    }),

    createRecipe({
      title: 'Pâtes au brocoli',
      description: 'Plat simple et savoureux.',
      preparation_time: 25,
      recipe_type: RecipeType.MAIN_COURSE,
      author: user2.profile,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Pâtes'),
        createIngredient(1, Unit.PIECE, 'Brocoli'),
        createIngredient(10, Unit.MILLILITER, "Huile d'olive"),
      ],
      steps: createSteps(['Cuire les pâtes.', 'Mélanger avec le brocoli.']),
    }),

    createRecipe({
      title: 'Pâtes crémeuses aux champignons',
      description:
        'Un plat simple, rapide et savoureux, idéal pour un dîner réconfortant. Les champignons sautés se marient parfaitement avec une sauce crémeuse légèrement parfumée à l’ail.',
      preparation_time: 25,
      recipe_type: RecipeType.MAIN_COURSE,
      author: user1.profile,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Pâtes'),
        createIngredient(150, Unit.GRAM, 'Champignons de Paris'),
        createIngredient(1, Unit.TABLESPOON, "Huile d'olive"),
        createIngredient(100, Unit.MILLILITER, 'Crème liquide'),
        createIngredient(1, Unit.TABLESPOON, "Gousse d'ail"),
        createIngredient(1, Unit.TEASPOON, 'Sel'),
      ],
      steps: createSteps([
        'Faire cuire les pâtes dans une grande casserole d’eau bouillante salée selon les instructions du paquet.',
        'Pendant ce temps, nettoyer et émincer les champignons.',
        'Faire chauffer l’huile d’olive dans une poêle et y faire revenir l’ail haché pendant 1 minute.',
        'Ajouter les champignons et les faire sauter jusqu’à ce qu’ils soient dorés.',
        'Verser la crème liquide, saler légèrement et laisser mijoter 3 minutes.',
        'Égoutter les pâtes et les mélanger à la sauce. Servir immédiatement.',
      ]),
    }),

    createRecipe({
      title: 'Choucroute alsacienne traditionnelle',
      description:
        "Un plat emblématique d'Alsace : chou fermenté mijoté longuement avec des viandes fumées, des saucisses et des pommes de terre. Un plat généreux, rustique et convivial.",
      preparation_time: 150,
      recipe_type: RecipeType.MAIN_COURSE,
      author: user1.profile,

      ingredients: [
        // base
        createIngredient(1, Unit.KILOGRAM, 'Choucroute crue'),
        createIngredient(800, Unit.GRAM, 'Pommes de terre'),

        // aromatics
        createIngredient(2, Unit.PIECE, 'Oignon'),
        createIngredient(2, Unit.PIECE, "Gousse d'ail"),
        createIngredient(2, Unit.PIECE, 'Laurier'),
        createIngredient(5, Unit.GRAM, 'Baies de genièvre'),

        // meats (authentic core)
        createIngredient(300, Unit.GRAM, 'Palette fumée'),
        createIngredient(200, Unit.GRAM, 'Lard'),
        createIngredient(4, Unit.PIECE, 'Saucisse de Strasbourg'),

        // liquid & seasoning
        createIngredient(200, Unit.MILLILITER, 'Vin blanc'),
        createIngredient(1, Unit.TABLESPOON, 'Sel'),
        createIngredient(1, Unit.TEASPOON, 'Poivre'),
      ],

      steps: createSteps([
        'Rincer légèrement la choucroute crue si nécessaire pour réduire l’acidité.',
        'Faire revenir les oignons émincés et l’ail dans une grande cocotte.',
        'Ajouter la choucroute, les feuilles de laurier et les baies de genièvre.',
        'Déglacer avec le vin blanc puis couvrir à hauteur.',
        'Laisser mijoter à feu doux pendant environ 1h30 en mélangeant régulièrement.',
        'Ajouter la palette fumée et le lard dans la cocotte et poursuivre la cuisson.',
        'Cuire les pommes de terre à part dans de l’eau salée.',
        'Ajouter les saucisses de Strasbourg en fin de cuisson pour les réchauffer sans les éclater.',
        'Servir bien chaud avec les viandes, les pommes de terre et la choucroute.',
      ]),
    }),

    // -----------------------
    // DESSERT
    // -----------------------
    createRecipe({
      title: 'Mousse au chocolat noir intense',
      description:
        'Une mousse légère et aérienne au chocolat noir, idéale pour terminer un repas sur une note gourmande et élégante.',
      preparation_time: 20,
      recipe_type: RecipeType.DESSERT,
      author: admin.profile,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Chocolat noir'),
        createIngredient(3, Unit.PIECE, 'Œuf'),
        createIngredient(30, Unit.GRAM, 'Sucre en poudre'),
      ],
      steps: createSteps([
        'Faire fondre le chocolat au bain-marie.',
        'Séparer les blancs des jaunes d’œufs.',
        'Incorporer les jaunes au chocolat fondu.',
        'Monter les blancs en neige avec le sucre.',
        'Incorporer délicatement les blancs au mélange.',
        'Réfrigérer au moins 3 heures.',
      ]),
    }),

    createRecipe({
      title: 'Tarte fine aux pommes caramélisées',
      description:
        'Une tarte croustillante et parfumée, avec des pommes fondantes légèrement caramélisées au miel.',
      preparation_time: 35,
      recipe_type: RecipeType.DESSERT,
      author: user1.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Pomme'),
        createIngredient(1, Unit.PIECE, 'Pâte feuilletée'),
        createIngredient(2, Unit.TABLESPOON, 'Miel'),
        createIngredient(20, Unit.GRAM, 'Beurre'),
      ],
      steps: createSteps([
        'Étaler la pâte feuilletée.',
        'Couper les pommes en fines lamelles.',
        'Faire revenir les pommes dans le beurre et le miel.',
        'Disposer les pommes sur la pâte.',
        'Cuire au four jusqu’à caramélisation.',
      ]),
    }),

    createRecipe({
      title: 'Riz au lait vanillé crémeux',
      description: 'Un dessert traditionnel, doux et réconfortant, parfumé à la vanille.',
      preparation_time: 40,
      recipe_type: RecipeType.DESSERT,
      author: user2.profile,
      ingredients: [
        createIngredient(100, Unit.GRAM, 'Riz'),
        createIngredient(500, Unit.MILLILITER, 'Lait'),
        createIngredient(50, Unit.GRAM, 'Sucre en poudre'),
      ],
      steps: createSteps([
        'Faire chauffer le lait avec le sucre.',
        'Ajouter le riz et cuire à feu doux.',
        'Remuer régulièrement jusqu’à absorption.',
        'Laisser refroidir avant dégustation.',
      ]),
    }),

    // -----------------------
    // BEVERAGE
    // -----------------------
    createRecipe({
      title: 'Smoothie mangue-banane frais',
      description: 'Un smoothie exotique, riche et crémeux parfait pour le petit-déjeuner.',
      preparation_time: 5,
      recipe_type: RecipeType.BEVERAGE,
      author: admin.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Banane'),
        createIngredient(1, Unit.PIECE, 'Mangue'),
        createIngredient(200, Unit.MILLILITER, 'Lait'),
      ],
      steps: createSteps([
        'Éplucher et couper les fruits.',
        'Mixer avec le lait.',
        'Servir bien frais.',
      ]),
    }),

    createRecipe({
      title: 'Citronnade maison rafraîchissante',
      description: 'Boisson acidulée et désaltérante, idéale en été.',
      preparation_time: 10,
      recipe_type: RecipeType.BEVERAGE,
      author: user1.profile,
      ingredients: [
        createIngredient(2, Unit.PIECE, 'Citron'),
        createIngredient(30, Unit.GRAM, 'Sucre en poudre'),
        createIngredient(500, Unit.MILLILITER, 'Eau'),
      ],
      steps: createSteps([
        'Presser les citrons.',
        'Ajouter sucre et eau.',
        'Mélanger et servir frais.',
      ]),
    }),

    createRecipe({
      title: 'Thé glacé maison à la menthe',
      description: 'Un thé glacé léger et aromatique avec une touche de menthe fraîche.',
      preparation_time: 15,
      recipe_type: RecipeType.BEVERAGE,
      author: user2.profile,
      ingredients: [
        createIngredient(2, Unit.PIECE, 'Thé'),
        createIngredient(5, Unit.GRAM, 'Miel'),
        createIngredient(1, Unit.PIECE, 'Menthe'),
      ],
      steps: createSteps([
        'Infuser le thé.',
        'Ajouter miel et menthe.',
        'Refroidir et servir avec glaçons.',
      ]),
    }),

    // -----------------------
    // SNACK
    // -----------------------
    createRecipe({
      title: 'Toast avocat citronné',
      description: 'Snack rapide, sain et équilibré à base d’avocat écrasé.',
      preparation_time: 10,
      recipe_type: RecipeType.SNACK,
      author: admin.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Pain'),
        createIngredient(1, Unit.PIECE, 'Avocat'),
        createIngredient(1, Unit.PIECE, 'Citron'),
      ],
      steps: createSteps([
        'Écraser l’avocat.',
        'Ajouter le citron.',
        'Tartiner sur le pain grillé.',
      ]),
    }),

    createRecipe({
      title: 'Yaourt granola croquant',
      description: 'Un snack sucré et équilibré parfait pour une pause rapide.',
      preparation_time: 5,
      recipe_type: RecipeType.SNACK,
      author: user1.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Yaourt nature'),
        createIngredient(30, Unit.GRAM, 'Avoine'),
        createIngredient(10, Unit.GRAM, 'Miel'),
      ],
      steps: createSteps(['Verser le yaourt.', 'Ajouter granola.', 'Arroser de miel.']),
    }),

    createRecipe({
      title: 'Noix caramélisées maison',
      description: 'Snack sucré-salé parfait pour l’apéritif ou le grignotage.',
      preparation_time: 12,
      recipe_type: RecipeType.SNACK,
      author: user2.profile,
      ingredients: [
        createIngredient(50, Unit.GRAM, 'Noix'),
        createIngredient(20, Unit.GRAM, 'Miel'),
        createIngredient(10, Unit.GRAM, 'Sucre en poudre'),
      ],
      steps: createSteps([
        'Faire chauffer le miel.',
        'Ajouter les noix.',
        'Caraméliser à feu doux.',
      ]),
    }),

    // -----------------------
    // APETIZER
    // -----------------------
    createRecipe({
      title: 'Bruschetta tomate basilic',
      description: 'Apéritif italien classique simple et frais.',
      preparation_time: 15,
      recipe_type: RecipeType.APPETIZER,
      author: admin.profile,
      ingredients: [
        createIngredient(2, Unit.PIECE, 'Tomate'),
        createIngredient(1, Unit.PIECE, 'Pain'),
        createIngredient(5, Unit.GRAM, 'Basilic'),
      ],
      steps: createSteps(['Couper les tomates.', 'Ajouter basilic.', 'Servir sur pain grillé.']),
    }),

    createRecipe({
      title: 'Mini brochettes de poulet épicé',
      description: 'Petites brochettes savoureuses et légèrement relevées.',
      preparation_time: 20,
      recipe_type: RecipeType.APPETIZER,
      author: user1.profile,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Poulet'),
        createIngredient(5, Unit.GRAM, 'Paprika'),
        createIngredient(1, Unit.TABLESPOON, "Huile d'olive"),
      ],
      steps: createSteps(['Couper le poulet.', 'Assaisonner.', 'Griller sur brochettes.']),
    }),

    createRecipe({
      title: 'Crevettes sautées à l’ail',
      description: 'Apéritif rapide et parfumé à l’ail et aux herbes.',
      preparation_time: 12,
      recipe_type: RecipeType.APPETIZER,
      author: user2.profile,
      ingredients: [
        createIngredient(150, Unit.GRAM, 'Crevette'),
        createIngredient(1, Unit.PIECE, "Gousse d'ail"),
        createIngredient(1, Unit.TABLESPOON, "Huile d'olive"),
      ],
      steps: createSteps([
        'Faire revenir l’ail.',
        'Ajouter les crevettes.',
        'Cuire rapidement à feu vif.',
      ]),
    }),

    // -----------------------
    // SIDE DISH
    // -----------------------
    createRecipe({
      title: 'Purée de pommes de terre maison',
      description: 'Un accompagnement crémeux et réconfortant.',
      preparation_time: 30,
      recipe_type: RecipeType.SIDE_DISH,
      author: admin.profile,
      ingredients: [
        createIngredient(3, Unit.PIECE, 'Pommes de terre'),
        createIngredient(20, Unit.GRAM, 'Beurre'),
        createIngredient(100, Unit.MILLILITER, 'Lait'),
      ],
      steps: createSteps([
        'Cuire les pommes de terre.',
        'Écraser avec le beurre.',
        'Ajouter le lait.',
      ]),
    }),

    createRecipe({
      title: 'Riz pilaf parfumé',
      description: 'Riz légèrement doré avec oignon et épices.',
      preparation_time: 25,
      recipe_type: RecipeType.SIDE_DISH,
      author: user1.profile,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Riz'),
        createIngredient(1, Unit.PIECE, 'Oignon'),
        createIngredient(10, Unit.MILLILITER, "Huile d'olive"),
      ],
      steps: createSteps([
        'Faire revenir l’oignon.',
        'Ajouter le riz.',
        'Cuire jusqu’à absorption.',
      ]),
    }),

    createRecipe({
      title: 'Légumes rôtis au four',
      description: 'Mélange de légumes rôtis simples et savoureux.',
      preparation_time: 35,
      recipe_type: RecipeType.SIDE_DISH,
      author: user2.profile,
      ingredients: [
        createIngredient(1, Unit.PIECE, 'Carotte'),
        createIngredient(1, Unit.PIECE, 'Courgette'),
        createIngredient(1, Unit.PIECE, 'Poivron'),
        createIngredient(1, Unit.TABLESPOON, "Huile d'olive"),
      ],
      steps: createSteps(['Couper les légumes.', 'Assaisonner.', 'Cuire au four.']),
    }),
  ];
}
