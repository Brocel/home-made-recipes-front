import { HttpRequest, HttpResponse } from '@angular/common/http';
import { MockApiService } from '@app/mocks/services/mock-api.service';
import { Recipe } from '@models/recipes/recipe';
import { Observable, map } from 'rxjs';

export function handleRecipes(
  req: HttpRequest<any>,
  mockApi: MockApiService,
  cleanUrl: string,
): Observable<HttpResponse<any>> | null {
  const { method } = req;

  // GET /recipes
  if (method === 'GET' && cleanUrl === '/recipes') {
    return mockApi.getRecipes().pipe(map((data) => new HttpResponse({ status: 200, body: data })));
  }

  // GET /recipes/:id
  if (method === 'GET' && /^\/recipes\/\d+$/.test(cleanUrl)) {
    const id = Number(cleanUrl.split('/')[2]);

    return mockApi
      .getRecipeById(id)
      .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
  }

  // GET /recipes/daily
  if (method === 'GET' && cleanUrl === '/recipes/daily') {
    return mockApi
      .getDailyRecipe()
      .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
  }

  // POST /recipes
  if (method === 'POST' && cleanUrl === '/recipes') {
    const body = req.body as Recipe;

    return mockApi
      .createRecipe(body)
      .pipe(map((data) => new HttpResponse({ status: 201, body: data })));
  }

  // PUT /recipes/:id
  if (method === 'PUT' && /^\/recipes\/\d+$/.test(cleanUrl)) {
    const id = Number(cleanUrl.split('/')[2]);
    const body = req.body as Recipe;

    return mockApi
      .updateRecipe(id, body)
      .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
  }

  // DELETE /recipes/:id
  if (method === 'DELETE' && /^\/recipes\/\d+$/.test(cleanUrl)) {
    const id = Number(cleanUrl.split('/')[2]);

    return mockApi.deleteRecipe(id).pipe(map(() => new HttpResponse({ status: 204 })));
  }

  return null;
}
