import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { MockRoute } from '../router/mock-route.model';
import { createCrudRoutes } from '../router/route.helper';
import { MockRecipeApiService } from '../services/mock-recipe-api.service';

export const RECIPES_ROUTES: MockRoute[] = [
  ...createCrudRoutes('/recipes', MockRecipeApiService, {
    getAll: (s) => s.getRecipes(),
    getById: (s, id) => s.getRecipeById(id),
    create: (s, body) => s.createRecipe(body),
    update: (s, id, body) => s.updateRecipe(id, body),
    delete: (s, id) => s.deleteRecipe(id),
  }),

  // CUSTOM ROUTES
  {
    method: 'GET',
    path: /^\/recipes\/daily$/,
    handler: (req, _, injector) => {
      const service = injector.get(MockRecipeApiService);

      return service
        .getDailyRecipe()
        .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
    },
  },
];
