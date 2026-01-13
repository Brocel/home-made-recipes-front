import { Component, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@core/api/recipes.api';
import { Recipe } from '@shared/models/recipes/recipe';
import { isAuthenticated } from '@core/auth/auth.signals';
import { QuickSearch } from '@features/recipes/search/quick-search/quick-search';
import { AdvancedSearch } from '@features/recipes/search/advanced-search/advanced-search';
import { AuthCallToAction } from '../auth-call-to-action/auth-call-to-action';
import { AddRecipeMini } from '@features/recipes/add/add-recipe-mini/add-recipe-mini';
import { finalize, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipeMini } from '@features/recipes/recipe-mini/recipe-mini';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LanguageService } from '@core/i18n/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    QuickSearch,
    AdvancedSearch,
    AuthCallToAction,
    AddRecipeMini,
    TranslatePipe,
    RecipeMini,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  fakeDailyRecipe: Recipe = { // TODO: delete later
    id: 0,
    title: 'Recette du jour',
    description: 'Une délicieuse recette à essayer aujourd\'hui.',
    author: 'Chef Exemple',
    type: 'Dessert',
    preparationTime: 30,
  };

  // Signals
  dailyRecipe = signal<Recipe | null>(null);
  loading = signal(false);
  auth = isAuthenticated;
  errorMessage = signal<string | null>(null);

  constructor(private api: RecipesApi, private lang: LanguageService) {
  }


  ngOnInit(): void {
    this.fetchDailyRecipe();
    if (!this.dailyRecipe()) {
      this.dailyRecipe.set(this.fakeDailyRecipe);
    }
  }

  fetchDailyRecipe(): void {
    this.loading.set(true);
    this.api.dailyRecipe().pipe(
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
      })
    ).subscribe();
  }

  onSearch(query: string) {
    console.log('search', query);
  }

  onAdvancedSearch(payload: any) {
    console.log('advanced search', payload);
  }

  onOpenCreateFull(payload: { title?: string; type?: string }) {
    console.log('open create full', payload);
  }

  protected readonly console = console;
}
