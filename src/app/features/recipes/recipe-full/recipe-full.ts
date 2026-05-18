import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollWrapper } from '../../../shared/components/layout/scroll-wrapper/scroll-wrapper';

import { IngredientTypeLabel } from '@models/recipes/ingredient-type.enum';
import { Recipe } from '@models/recipes/recipe';
import { RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { UnitLongLabel, UnitShortLabel } from '@models/recipes/unit.enum';

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
    ScrollWrapper,
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
