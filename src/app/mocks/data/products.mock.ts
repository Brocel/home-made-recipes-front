import { Product } from '@models/recipes/ingredient';
import { IngredientType } from '@models/recipes/ingredient-type.enum';

export const MOCK_PRODUCTS: Product[] = [
  // VEGETABLE
  { id: 1, name: 'Carotte', ingredient_type: IngredientType.VEGETABLE },
  { id: 2, name: 'Tomate', ingredient_type: IngredientType.VEGETABLE },
  { id: 3, name: 'Courgette', ingredient_type: IngredientType.VEGETABLE },
  { id: 4, name: 'Brocoli', ingredient_type: IngredientType.VEGETABLE },
  { id: 5, name: 'Chou-fleur', ingredient_type: IngredientType.VEGETABLE },
  { id: 6, name: 'Épinards', ingredient_type: IngredientType.VEGETABLE },
  { id: 7, name: 'Poivron', ingredient_type: IngredientType.VEGETABLE },
  { id: 8, name: 'Haricot vert', ingredient_type: IngredientType.VEGETABLE },
  { id: 9, name: 'Aubergine', ingredient_type: IngredientType.VEGETABLE },

  // FRUIT
  { id: 10, name: 'Pomme', ingredient_type: IngredientType.FRUIT },
  { id: 11, name: 'Banane', ingredient_type: IngredientType.FRUIT },
  { id: 12, name: 'Orange', ingredient_type: IngredientType.FRUIT },
  { id: 13, name: 'Fraise', ingredient_type: IngredientType.FRUIT },
  { id: 14, name: 'Poire', ingredient_type: IngredientType.FRUIT },
  { id: 15, name: 'Citron', ingredient_type: IngredientType.FRUIT },
  { id: 16, name: 'Mangue', ingredient_type: IngredientType.FRUIT },
  { id: 17, name: 'Raisin', ingredient_type: IngredientType.FRUIT },
  { id: 18, name: 'Avocat', ingredient_type: IngredientType.FRUIT },

  // MEAT
  { id: 20, name: 'Poulet', ingredient_type: IngredientType.MEAT },
  { id: 21, name: 'Bœuf', ingredient_type: IngredientType.MEAT },
  { id: 22, name: 'Porc', ingredient_type: IngredientType.MEAT },
  { id: 23, name: 'Agneau', ingredient_type: IngredientType.MEAT },
  { id: 24, name: 'Dinde', ingredient_type: IngredientType.MEAT },

  // FISH
  { id: 30, name: 'Saumon', ingredient_type: IngredientType.FISH },
  { id: 31, name: 'Thon', ingredient_type: IngredientType.FISH },
  { id: 32, name: 'Cabillaud', ingredient_type: IngredientType.FISH },
  { id: 33, name: 'Merlu', ingredient_type: IngredientType.FISH },

  // DAIRY
  { id: 40, name: 'Lait', ingredient_type: IngredientType.DAIRY },
  { id: 41, name: 'Crème fraîche', ingredient_type: IngredientType.DAIRY },
  { id: 42, name: 'Yaourt nature', ingredient_type: IngredientType.DAIRY },

  // CHEESE
  { id: 50, name: 'Mozzarella', ingredient_type: IngredientType.CHEESE },
  { id: 51, name: 'Comté', ingredient_type: IngredientType.CHEESE },
  { id: 52, name: 'Gruyère', ingredient_type: IngredientType.CHEESE },
  { id: 53, name: 'Parmesan', ingredient_type: IngredientType.CHEESE },
  { id: 54, name: 'Camembert', ingredient_type: IngredientType.CHEESE },

  // GRAIN / STARCHES
  { id: 60, name: 'Quinoa', ingredient_type: IngredientType.GRAIN },
  { id: 61, name: 'Semoule', ingredient_type: IngredientType.GRAIN },
  { id: 62, name: 'Boulgour', ingredient_type: IngredientType.GRAIN },
  { id: 63, name: 'Avoine', ingredient_type: IngredientType.GRAIN },

  { id: 70, name: 'Pâtes', ingredient_type: IngredientType.STARCHES },
  { id: 71, name: 'Riz', ingredient_type: IngredientType.STARCHES },
  { id: 72, name: 'Pommes de terre', ingredient_type: IngredientType.STARCHES },
  { id: 73, name: 'Lentilles', ingredient_type: IngredientType.STARCHES },
  { id: 74, name: 'Haricot rouge', ingredient_type: IngredientType.STARCHES },
  { id: 75, name: 'Haricot blanc', ingredient_type: IngredientType.STARCHES },
  { id: 76, name: 'Pois chiches', ingredient_type: IngredientType.STARCHES },

  // SPICES
  { id: 80, name: 'Sel', ingredient_type: IngredientType.SPICE },
  { id: 81, name: 'Poivre', ingredient_type: IngredientType.SPICE },
  { id: 82, name: 'Paprika', ingredient_type: IngredientType.SPICE },
  { id: 83, name: 'Cumin', ingredient_type: IngredientType.SPICE },
  { id: 84, name: 'Curcuma', ingredient_type: IngredientType.SPICE },
  { id: 85, name: 'Cannelle', ingredient_type: IngredientType.SPICE },
  { id: 86, name: 'Piment doux', ingredient_type: IngredientType.SPICE },

  // CONDIMENTS
  { id: 90, name: 'Oignon', ingredient_type: IngredientType.CONDIMENT },
  { id: 91, name: 'Ail', ingredient_type: IngredientType.CONDIMENT },
  { id: 92, name: 'Échalote', ingredient_type: IngredientType.CONDIMENT },
  { id: 93, name: 'Ketchup', ingredient_type: IngredientType.CONDIMENT },
  { id: 94, name: 'Moutarde', ingredient_type: IngredientType.CONDIMENT },
  { id: 95, name: 'Mayonnaise', ingredient_type: IngredientType.CONDIMENT },
  { id: 96, name: 'Sauce soja', ingredient_type: IngredientType.CONDIMENT },
  { id: 97, name: 'Vinaigre balsamique', ingredient_type: IngredientType.CONDIMENT },
  { id: 98, name: 'Sauce tomate', ingredient_type: IngredientType.CONDIMENT },

  // SEA FOOD
  { id: 110, name: 'Crevette', ingredient_type: IngredientType.SEA_FRUIT },
  { id: 111, name: 'Moule', ingredient_type: IngredientType.SEA_FRUIT },
  { id: 112, name: 'Calamar', ingredient_type: IngredientType.SEA_FRUIT },
  { id: 113, name: 'Noix de Saint-Jacques', ingredient_type: IngredientType.SEA_FRUIT },

  // NUTS
  { id: 120, name: 'Amande', ingredient_type: IngredientType.NUT },
  { id: 121, name: 'Noisette', ingredient_type: IngredientType.NUT },
  { id: 122, name: 'Noix', ingredient_type: IngredientType.NUT },
  { id: 123, name: 'Pistache', ingredient_type: IngredientType.NUT },
  { id: 124, name: 'Noix de cajou', ingredient_type: IngredientType.NUT },

  // HERBS
  { id: 130, name: 'Basilic', ingredient_type: IngredientType.HERBS },
  { id: 131, name: 'Persil', ingredient_type: IngredientType.HERBS },
  { id: 132, name: 'Coriandre', ingredient_type: IngredientType.HERBS },
  { id: 133, name: 'Thym', ingredient_type: IngredientType.HERBS },
  { id: 134, name: 'Romarin', ingredient_type: IngredientType.HERBS },
  { id: 135, name: 'Origan', ingredient_type: IngredientType.HERBS },

  // FAT
  { id: 140, name: "Huile d'olive", ingredient_type: IngredientType.FAT },
  { id: 141, name: 'Huile de tournesol', ingredient_type: IngredientType.FAT },
  { id: 142, name: 'Beurre', ingredient_type: IngredientType.FAT },
  { id: 143, name: 'Beurre demi-sel', ingredient_type: IngredientType.FAT },
  { id: 144, name: 'Margarine', ingredient_type: IngredientType.FAT },

  // SUGAR
  { id: 150, name: 'Sucre en poudre', ingredient_type: IngredientType.SUGAR },
  { id: 151, name: 'Cassonade', ingredient_type: IngredientType.SUGAR },
  { id: 152, name: 'Miel', ingredient_type: IngredientType.SUGAR },
  { id: 153, name: "Sirop d'érable", ingredient_type: IngredientType.SUGAR },

  // BEVERAGE
  { id: 160, name: 'Eau', ingredient_type: IngredientType.BEVERAGE },
  { id: 161, name: "Jus d'orange", ingredient_type: IngredientType.BEVERAGE },
  { id: 162, name: 'Jus de pomme', ingredient_type: IngredientType.BEVERAGE },
  { id: 163, name: 'Limonade', ingredient_type: IngredientType.BEVERAGE },
  { id: 164, name: 'Café', ingredient_type: IngredientType.BEVERAGE },
  { id: 165, name: 'Thé', ingredient_type: IngredientType.BEVERAGE },

  // ALCOHOL
  { id: 170, name: 'Vin blanc', ingredient_type: IngredientType.ALCOHOL },
  { id: 171, name: 'Vin rouge', ingredient_type: IngredientType.ALCOHOL },
  { id: 172, name: 'Bière', ingredient_type: IngredientType.ALCOHOL },
  { id: 173, name: 'Rhum', ingredient_type: IngredientType.ALCOHOL },
  { id: 174, name: 'Vodka', ingredient_type: IngredientType.ALCOHOL },
  { id: 175, name: 'Whisky', ingredient_type: IngredientType.ALCOHOL },

  // OTHER
  { id: 180, name: 'Pain', ingredient_type: IngredientType.OTHER },
  { id: 181, name: 'Bouillon de légumes', ingredient_type: IngredientType.OTHER },
  { id: 182, name: 'Farine', ingredient_type: IngredientType.OTHER },
  { id: 183, name: 'Levure boulangère', ingredient_type: IngredientType.OTHER },
];
