import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@core/api/recipes.api';
import { Recipe } from '@shared/models/recipes/recipe';
import { isAuthenticated } from '@core/auth/auth.signals';
import { QuickSearch } from '@features/recipes/search/quick-search/quick-search';
import { AdvancedSearch } from '@features/recipes/search/advanced-search/advanced-search';
import { AuthCallToAction } from '../auth-call-to-action/auth-call-to-action';
import { AddRecipeMini } from '@features/recipes/add/add-recipe-mini/add-recipe-mini';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipeMini } from '@features/recipes/recipe-mini/recipe-mini';

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
  dailyRecipe = signal<Recipe | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  auth = isAuthenticated;

  constructor(private api: RecipesApi) {
  }

  ngOnInit(): void {
    this.fetchDailyRecipe();
    if (!this.dailyRecipe()) {
      this.dailyRecipe.set(this.fakeDailyRecipe);
    }
  }

  fetchDailyRecipe(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.dailyRecipe().pipe(
      take(1),
      tap((recipe: Recipe) => {
        this.dailyRecipe.set(recipe);
      }),
      catchError((err) => {
        console.error('Error fetching daily recipe', err);
        // this.error.set('Impossible de charger la recette du jour.'); // TODO: remove comment later
        return of(null);
      }),
      finalize(() => {
        this.loading.set(false);
      })
    ).subscribe();
  }

  onSearch(query: string) {
    // placeholder : appeler l'API de recherche plus tard
    console.log('search', query);
  }

  onAdvancedSearch(payload: any) {
    console.log('advanced search', payload);
  }

  onOpenCreateFull(payload: { title?: string; type?: string }) {
    // navigation vers la page de création complète (à implémenter)
    // router navigation example: this.router.navigate(['/recipes/create'], { state: payload });
    console.log('open create full', payload);
  }

  protected readonly console = console;
}
