import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@api/recipes.api';
import { Recipe } from '@models/recipes/recipe';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { LanguageService } from '@translation/language.service';
import { finalize, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MOCK_RECIPES } from '../../../../public/mocks/recipes.mock';
import { RecipeFull } from '../recipes/recipe-full/recipe-full';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, RecipeFull, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  private readonly api = inject(RecipesApi);
  private readonly lang = inject(LanguageService);
  private readonly authStore = inject(AuthStore);

  // Signals
  readonly dailyRecipe = signal<Recipe | null>(null);
  readonly loading = signal(false);
  readonly auth = this.authStore.isAuthenticated;
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchDailyRecipe();
    if (!this.dailyRecipe()) {
      this.dailyRecipe.set((MOCK_RECIPES[0] as Recipe) ?? null);
    }
  }

  fetchDailyRecipe(): void {
    this.loading.set(true);
    this.api
      .dailyRecipe()
      .pipe(
        take(1),
        tap((recipe: Recipe) => {
          this.dailyRecipe.set(recipe);
        }),
        catchError(() => {
          this.lang.setMsg('errors.recipe.fetchingDaily', undefined);
          this.errorMessage.set(this.lang.getMessageSignal()());
          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }
}
