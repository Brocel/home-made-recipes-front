import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { Home } from '@home/home';
import { AddEditRecipe } from '@recipes/add/add-edit-recipe/add-edit-recipe';
import { RecipeFull } from '@recipes/recipe-full/recipe-full';
import { RecipeList } from '@recipes/recipe-list/recipe-list';
import { SearchRecipe } from '@recipes/search/recipe-search/search-recipe';
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
        component: Home,
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
            component: RecipeList,
            data: {
              feature: RECIPE_LIST_DATA,
              featureType: 'recipes',
            },
          },
          {
            path: 'add',
            component: AddEditRecipe,
            data: {
              feature: RECIPE_ADD_DATA,
              featureType: 'recipes',
            },
            canActivate: [AuthGuard],
          },
          {
            path: 'search',
            component: SearchRecipe,
            data: {
              feature: RECIPE_SEARCH_DATA,
              featureType: 'recipes',
            },
          },
          {
            path: 'see/:id',
            component: RecipeFull,
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
