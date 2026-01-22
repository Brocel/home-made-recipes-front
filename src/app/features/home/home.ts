import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@core/api/recipes.api';
import { isAuthenticated } from '@core/auth/auth.signals';
import { LanguageService } from '@core/i18n/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Recipe } from '@shared/models/recipes/recipe';
import { finalize, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipeFull } from '../recipes/recipe-full/recipe-full';
import { mockRecipe } from '../../../../public/mocks/recipe-mock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, RecipeFull, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  // Signals
  dailyRecipe = signal<Recipe | any>(null);
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
      this.dailyRecipe.set(mockRecipe);
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
