import { Injectable } from '@angular/core';
import { MOCK_RECIPES } from '@mocks/data/recipes.mock';
import { nextId, pickDailyIndex } from '@mocks/utils/api.util';
import { Recipe } from '@models/recipes/recipe';
import { delay, Observable, of, throwError } from 'rxjs';
import { latency } from '../utils/mock.constant';

@Injectable({ providedIn: 'root' })
export class MockRecipeApiService {
  private recipes: Recipe[] = structuredClone(MOCK_RECIPES);

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes).pipe(delay(latency));
  }

  getRecipeById(id: number): Observable<Recipe> {
    const recipe = this.recipes.find((r) => r.id === id);
    return recipe
      ? of(recipe).pipe(delay(latency))
      : throwError(() => new Error('Recipe not found'));
  }

  getDailyRecipe(): Observable<Recipe> {
    const recipes = this.recipes;

    if (!recipes.length) {
      throw new Error('No recipes available');
    }

    const index = pickDailyIndex(recipes.length);

    return of(recipes[index]).pipe(delay(latency));
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const newRecipe: Recipe = {
      ...recipe,
      id: nextId(this.recipes),
    };

    this.recipes.push(newRecipe);
    return of(newRecipe).pipe(delay(latency));
  }

  updateRecipe(id: number, update: Partial<Recipe>): Observable<Recipe> {
    const index = this.recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return throwError(() => new Error('Recipe not found'));
    }

    this.recipes[index] = {
      ...this.recipes[index],
      ...update,
    };

    return of(this.recipes[index]).pipe(delay(latency));
  }

  deleteRecipe(id: number): Observable<void> {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(latency));
  }
}
