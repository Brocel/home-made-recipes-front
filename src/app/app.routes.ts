import { Routes } from '@angular/router';
import { Home } from '@app/features/home/home';
import { FullAdd } from '@features/recipes/forms/add/full-add/full-add';
import { RecipeList } from '@features/recipes/recipe-list/recipe-list';
import { RecipeFull } from '@features/recipes/recipe-full/recipe-full';
import { AdvancedSearch } from '@features/recipes/forms/search/advanced-search/advanced-search';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'recipes', component: RecipeList, title: 'Recipes' },
  { path: 'recipes/create', component: FullAdd, title: 'Add Recipe' },
  { path: 'recipes/see', component: RecipeFull, title: 'Recipe' },
  { path: 'recipes/search', component: AdvancedSearch, title: 'Search Recipe' },
  { path: '**', redirectTo: '' },
];
