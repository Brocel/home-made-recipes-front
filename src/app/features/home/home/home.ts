import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@core/api/recipes.api';
import { Recipe } from '@shared/models/recipes/recipe';
import { currentUser, isAuthenticated } from '@core/auth/auth.signals';
import { Navbar } from '@shared/ui/navbar/navbar';
import { QuickSearch } from '@features/recipes/search/quick-search/quick-search';
import { AdvancedSearch } from '@features/recipes/search/advanced-search/advanced-search';
import { AuthCallToAction } from '../auth-call-to-action/auth-call-to-action';
import { AddRecipeMini } from '@features/recipes/add/add-recipe-mini/add-recipe-mini';
import { Button } from '@shared/ui/button/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    QuickSearch,
    AdvancedSearch,
    AuthCallToAction,
    AddRecipeMini,
    Button
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  recipes = signal<Recipe[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  user = currentUser;
  auth = isAuthenticated;

  constructor(private api: RecipesApi) {
  }

  ngOnInit(): void {
    this.fetchRecent();
  }

  fetchRecent(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.list({page: 1, pageSize: 6}).subscribe({
      next: (paged) => {
        this.recipes.set(paged.items ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Erreur lors du chargement des recettes');
        this.loading.set(false);
      }
    });
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
