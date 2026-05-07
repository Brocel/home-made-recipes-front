import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Recipe } from '@models/recipes/recipe';
import { map } from 'rxjs';
import { MockRoute } from '../router/mock-route.model';
import { MockRecipeApiService } from '../services/mock-recipe-api.service';

const recipeApi = inject(MockRecipeApiService);

export const RECIPES_ROUTES: MockRoute[] = [
  {
    method: 'GET',
    path: /^\/recipes$/,
    handler: (req) =>
      recipeApi.getRecipes().pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'GET',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params) =>
      recipeApi
        .getRecipeById(Number(params['id']))
        .pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'GET',
    path: /^\/recipes\/daily$/,
    handler: (req) =>
      recipeApi.getDailyRecipe().pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'POST',
    path: /^\/recipes$/,
    handler: (req) => {
      const body = req.body as Recipe;

      return recipeApi
        .createRecipe(body)
        .pipe(map((data) => new HttpResponse({ status: 201, body: data })));
    },
  },
  {
    method: 'PUT',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params) => {
      const body = req.body as Recipe;

      return recipeApi
        .updateRecipe(Number(params['id']), body)
        .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
    },
  },
  {
    method: 'DELETE',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params) =>
      recipeApi
        .deleteRecipe(Number(params['id']))
        .pipe(map(() => new HttpResponse({ status: 204 }))),
  },
];
