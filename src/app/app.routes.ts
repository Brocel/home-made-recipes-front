import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { Home } from '@home/home';
import { AddEditRecipe } from '@recipes/add/add-edit-recipe/add-edit-recipe';
import { RecipeFull } from '@recipes/recipe-full/recipe-full';
import { RecipeList } from '@recipes/recipe-list/recipe-list';
import { SearchRecipe } from '@recipes/search/recipe-search/search-recipe';
import { FEATURE_ROUTES, HOME_DATA, RECIPES_DATA } from '@utils/datas/feature-data.util';
import {
  RECIPE_ADD_DATA,
  RECIPE_EDIT_DATA,
  RECIPE_LIST_DATA,
  RECIPE_SEARCH_DATA,
  RECIPE_SEE_DATA,
  RECIPES_ROUTES,
} from '@utils/datas/recipes-data';

export const routes: Routes = [
  { path: '', component: Home, data: { feature: HOME_DATA } },
  {
    path: FEATURE_ROUTES.recipes,
    data: { feature: RECIPES_DATA },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RECIPES_ROUTES.list,
      },
      {
        path: RECIPES_ROUTES.list,
        component: RecipeList,
        data: { feature: RECIPE_LIST_DATA },
      },
      {
        path: RECIPES_ROUTES.add,
        component: AddEditRecipe,
        data: { feature: RECIPE_ADD_DATA },
        canActivate: [AuthGuard],
      },
      {
        path: RECIPES_ROUTES.edit + '/:id',
        component: AddEditRecipe,
        data: { feature: RECIPE_EDIT_DATA },
        canActivate: [AuthGuard], // TODO: UserGuard -> only author can edit recipe
      },
      {
        path: RECIPES_ROUTES.search,
        component: SearchRecipe,
        data: { feature: RECIPE_SEARCH_DATA },
      },
      {
        path: RECIPES_ROUTES.see + '/:id',
        component: RecipeFull,
        data: { feature: RECIPE_SEE_DATA },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
