import { Routes } from '@angular/router';
import { Home } from '@features/home/home/home';
import { AddRecipeFull } from '@features/recipes/add/add-recipe-full/add-recipe-full';
import { RecipeList } from '@features/recipes/recipe-list/recipe-list';
import { RecipeFull } from '@features/recipes/recipe-full/recipe-full';
import { AdvancedSearch } from '@features/recipes/search/advanced-search/advanced-search';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'recipes', component: RecipeList, title: 'Recipes' },
  { path: 'recipes/create', component: AddRecipeFull, title: 'Add Recipe' },
  { path: 'recipes/see', component: RecipeFull, title: 'Recipe' },
  { path: 'recipes/search', component: AdvancedSearch, title: 'Search Recipe' },
  { path: '**', redirectTo: '' }
];
