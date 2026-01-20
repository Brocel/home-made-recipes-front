import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@core/api/recipes.api';
import { isAuthenticated } from '@core/auth/auth.signals';
import { LanguageService } from '@core/i18n/language.service';
import { RecipeMini } from '@features/recipes/recipe-mini/recipe-mini';
import { TranslatePipe } from '@ngx-translate/core';
import { Recipe } from '@shared/models/recipes/recipe';
import { finalize, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, RecipeMini, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  fakeDailyRecipe: Recipe = {
    // TODO: delete later
    id: 0,
    title: 'Recette du jour',
    description: "Une délicieuse recette à essayer aujourd'hui.",
    author: 'Chef Exemple',
    type: 'Dessert',
    preparationTime: 30,
  };

  // Signals
  dailyRecipe = signal<Recipe | null>(null);
  loading = signal(false);
  auth = isAuthenticated;
  errorMessage = signal<string | null>(null);

  constructor(
    private api: RecipesApi,
    private lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.fetchDailyRecipe();
    if (!this.dailyRecipe()) {
      this.dailyRecipe.set(this.fakeDailyRecipe);
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
          this.errorMessage = this.lang.getMessageSignal();
          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }

  onAdvancedSearch(payload: any) {
    console.log('advanced search', payload);
  }

  protected readonly console = console;
}
