import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';

import { Recipe } from '@models/recipes/recipe';
import { RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { UnitShortLabel, UnitLongLabel } from '@models/recipes/unit.enum';
import {IngredientTypeLabel} from '@models/recipes/ingredient-type.enum';

@Component({
  selector: 'app-recipe-full',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDividerModule,
    TranslatePipe,
  ],
  templateUrl: './recipe-full.html',
  styleUrl: './recipe-full.scss',
})
export class RecipeFull {
  @Input() recipe!: Recipe;

  recipeTypeLabel = RecipeTypeLabel;
  unitShort = UnitShortLabel;
  unitLong = UnitLongLabel;
  ingredientTypeLabel = IngredientTypeLabel;

  // Panel global
  globalExpanded = signal(true);

  toggleAll(expanded: boolean) {
    this.globalExpanded.set(expanded);
  }

  get sortedSteps() {
    return [...this.recipe.step_list].sort((a, b) => a.order - b.order);
  }
}
