import { HttpResponse } from '@angular/common/http';
import { Recipe } from '@models/recipes/recipe';
import { map } from 'rxjs';
import { MockRoute } from '../router/mock-route.model';

export const RECIPES_ROUTES: MockRoute[] = [
  {
    method: 'GET',
    path: /^\/recipes$/,
    handler: (req, _, mockApi) =>
      mockApi.getRecipes().pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'GET',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params, mockApi) =>
      mockApi
        .getRecipeById(Number(params['id']))
        .pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'GET',
    path: /^\/recipes\/daily$/,
    handler: (req, _, mockApi) =>
      mockApi.getDailyRecipe().pipe(map((data) => new HttpResponse({ status: 200, body: data }))),
  },
  {
    method: 'POST',
    path: /^\/recipes$/,
    handler: (req, _, mockApi) => {
      const body = req.body as Recipe;

      return mockApi
        .createRecipe(body)
        .pipe(map((data) => new HttpResponse({ status: 201, body: data })));
    },
  },
  {
    method: 'PUT',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params, mockApi) => {
      const body = req.body as Recipe;

      return mockApi
        .updateRecipe(Number(params['id']), body)
        .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
    },
  },
  {
    method: 'DELETE',
    path: /^\/recipes\/(?<id>\d+)$/,
    handler: (req, params, mockApi) =>
      mockApi.deleteRecipe(Number(params['id'])).pipe(map(() => new HttpResponse({ status: 204 }))),
  },
];
