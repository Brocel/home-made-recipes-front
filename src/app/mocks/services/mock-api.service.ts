import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '@app/mocks/data/products.mock';
import { MOCK_RECIPES } from '@app/mocks/data/recipes.mock';
import { MOCK_USERS } from '@app/mocks/data/users.mocks';
import { Product } from '@app/shared/models/recipes/ingredient';
import { Recipe } from '@app/shared/models/recipes/recipe';
import { User } from '@app/shared/models/user';
import { Db } from '@mocks/utils/mock.type';
import { delay, Observable, of, throwError } from 'rxjs';
import { pickDailyIndex } from '../utils/api.util';
import { FAKE_TOKEN, MOCK_CURRENT_USER_ID } from '../utils/mock.constant';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private db: Db = {
    users: structuredClone(MOCK_USERS),
    recipes: structuredClone(MOCK_RECIPES),
    products: structuredClone(MOCK_PRODUCTS),
  };

  private latency = 300;

  // -----------------------
  // USERS
  // -----------------------
  getUsers(): Observable<User[]> {
    return of(this.db.users).pipe(delay(this.latency));
  }

  getUserById(id: string): Observable<User> {
    const user = this.db.users.find((u) => u.id === id);
    return user
      ? of(user).pipe(delay(this.latency))
      : throwError(() => new Error('User not found'));
  }

  getCurrentUser(): Observable<User> {
    return this.getUserById(MOCK_CURRENT_USER_ID);
  }

  // -----------------------
  // RECIPES
  // -----------------------
  getRecipes(): Observable<Recipe[]> {
    return of(this.db.recipes).pipe(delay(this.latency));
  }

  getRecipeById(id: number): Observable<Recipe> {
    const recipe = this.db.recipes.find((r) => r.id === id);
    return recipe
      ? of(recipe).pipe(delay(this.latency))
      : throwError(() => new Error('Recipe not found'));
  }

  getDailyRecipe(): Observable<Recipe> {
    const recipes = this.db.recipes;

    if (!recipes.length) {
      throw new Error('No recipes available');
    }

    const index = pickDailyIndex(recipes.length);

    return of(recipes[index]).pipe(delay(this.latency));
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const newRecipe: Recipe = {
      ...recipe,
      id: this.nextId(this.db.recipes),
    };

    this.db.recipes.push(newRecipe);
    return of(newRecipe).pipe(delay(this.latency));
  }

  updateRecipe(id: number, update: Partial<Recipe>): Observable<Recipe> {
    const index = this.db.recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return throwError(() => new Error('Recipe not found'));
    }

    this.db.recipes[index] = {
      ...this.db.recipes[index],
      ...update,
    };

    return of(this.db.recipes[index]).pipe(delay(this.latency));
  }

  deleteRecipe(id: number): Observable<void> {
    this.db.recipes = this.db.recipes.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(this.latency));
  }

  // -----------------------
  // PRODUCTS
  // -----------------------
  getProducts(): Observable<Product[]> {
    return of(this.db.products).pipe(delay(this.latency));
  }

  // -----------------------
  // utils
  // -----------------------
  private nextId<T extends { id: number }>(arr: T[]): number {
    return arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1;
  }

  // -----------------------
  // AUTH
  // -----------------------
  login(username: string): Observable<{ token: string; user: User }> {
    const user = this.db.users.find((u) => u.username === username);

    if (!user) {
      return throwError(() => ({
        status: 401,
        message: 'Invalid credentials',
      }));
    }

    return of({
      token: FAKE_TOKEN,
      user,
    }).pipe(delay(this.latency));
  }

  logout(): Observable<void> {
    return of(void 0).pipe(delay(this.latency));
  }
}
