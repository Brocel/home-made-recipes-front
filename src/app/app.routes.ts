import { Routes } from '@angular/router';
import { Home } from '@home/home';
import { RecipeFull } from '@recipes/recipe-full/recipe-full';
import { RecipeList } from '@recipes/recipe-list/recipe-list';
import { AuthGuard } from './core/guards/auth.guard';
import { FullAdd } from './features/recipes/add/full-add/full-add';
import { AdvancedSearch } from './features/recipes/search/advanced-search/advanced-search';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'recipes', component: RecipeList, title: 'Recipes' },
  { path: 'recipes/create', component: FullAdd, title: 'Add Recipe', canActivate: [AuthGuard] },
  { path: 'recipes/see', component: RecipeFull, title: 'Recipe' },
  { path: 'recipes/search', component: AdvancedSearch, title: 'Search Recipe' },
  { path: '**', redirectTo: '' },
];
