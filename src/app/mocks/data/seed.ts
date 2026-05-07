import { MOCK_PRODUCTS } from '@app/mocks/data/products.mock';
import { MOCK_USERS } from '@app/mocks/data/users.mocks';
import { Ingredient, Product } from '@models/recipes/ingredient';
import { Recipe } from '@models/recipes/recipe';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Step } from '@models/recipes/step';
import { Unit } from '@models/recipes/unit.enum';
import { User } from '@models/user';

// -----------------------
// Internal counters
// -----------------------
let recipeId = 1;
let ingredientId = 1;
let stepId = 1;

// -----------------------
// Helpers
// -----------------------
function getProductByName(name: string): Product {
  const product = MOCK_PRODUCTS.find((p) => p.name === name);
  if (!product) {
    throw new Error(`Product not found: ${name}`);
  }
  return product;
}

function createIngredient(quantity: number, unit: Unit, productName: string): Ingredient {
  return {
    id: ingredientId++,
    quantity,
    unit,
    product: getProductByName(productName),
  };
}

function createSteps(descriptions: string[]): Step[] {
  return descriptions.map((desc, index) => ({
    id: stepId++,
    description: desc,
    order: index + 1,
  }));
}

function createRecipe(params: {
  title: string;
  description: string;
  preparation_time: number;
  recipe_type: RecipeType;
  author: User;
  ingredients: Ingredient[];
  steps: Step[];
}): Recipe {
  return {
    id: recipeId++,
    title: params.title,
    description: params.description,
    preparation_time: params.preparation_time,
    recipe_type: params.recipe_type,
    publication_date: new Date().toISOString(),
    author: params.author,
    ingredient_list: params.ingredients,
    step_list: params.steps,
  };
}

// -----------------------
// Seed function
// -----------------------
export function seedRecipes(): Recipe[] {
  const admin = MOCK_USERS[0];
  const user1 = MOCK_USERS[1];
  const user2 = MOCK_USERS[1];

  return [
    // -----------------------
    // STARTER
    // -----------------------
    createRecipe({
      title: 'Salade de tomates fraîches',
      description: 'Une salade simple et rafraîchissante.',
      preparation_time: 10,
      recipe_type: RecipeType.STARTER,
      author: admin,
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
      author: user1,
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
      author: admin,
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
      author: user2,
      ingredients: [
        createIngredient(200, Unit.GRAM, 'Pâtes'),
        createIngredient(1, Unit.PIECE, 'Brocoli'),
        createIngredient(10, Unit.MILLILITER, "Huile d'olive"),
      ],
      steps: createSteps(['Cuire les pâtes.', 'Mélanger avec le brocoli.']),
    }),

    // TODO: create more recipes
  ];
}
