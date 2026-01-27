import { Injectable, signal } from '@angular/core';
import { RecipeType } from '@models/recipes/recipe-type.enum';

@Injectable({ providedIn: 'root' })
export class RecipeCreateBridgeService {
  payload = signal<{ title?: string; recipe_type?: RecipeType } | null>(null);

  setPayload(data: { title?: string; recipe_type?: RecipeType }) {
    this.payload.set(data);
  }

  clear() {
    this.payload.set(null);
  }
}
