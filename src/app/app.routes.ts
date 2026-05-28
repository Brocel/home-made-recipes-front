import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { HOME_DATA, HOME_MENU_ITEMS } from '@utils/datas/feature-data.util';
import {
  RECIPE_ADD_DATA,
  RECIPE_LIST_DATA,
  RECIPE_SEARCH_DATA,
  RECIPE_SEE_DATA,
} from '@utils/datas/recipes-data';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hmr',
  },
  /*
   * APP SHELL
   */
  {
    path: 'hmr',
    children: [
      /*
       * HOME
       */
      {
        path: '',
        loadComponent: () => import('@home/home').then((m) => m.Home),
        data: {
          feature: HOME_DATA,
          menu: HOME_MENU_ITEMS,
        },
      },
      /*
       * RECIPES
       */
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@recipes/recipe-list/recipe-list').then((m) => m.RecipeList),
            data: {
              feature: RECIPE_LIST_DATA,
              featureType: 'recipes',
            },
          },
          {
            path: 'add',
            loadComponent: () =>
              import('@recipes/add/add-edit-recipe/add-edit-recipe').then((m) => m.AddEditRecipe),
            data: {
              feature: RECIPE_ADD_DATA,
              featureType: 'recipes',
            },
            canActivate: [AuthGuard],
          },
          {
            path: 'search',
            loadComponent: () =>
              import('@recipes/search/recipe-search/search-recipe').then((m) => m.SearchRecipe),
            data: {
              feature: RECIPE_SEARCH_DATA,
              featureType: 'recipes',
            },
          },
          {
            path: 'see/:id',
            loadComponent: () =>
              import('@recipes/recipe-full/recipe-full').then((m) => m.RecipeFull),
            data: {
              feature: RECIPE_SEE_DATA,
              featureType: 'recipes',
            },
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'hmr',
  },
];
