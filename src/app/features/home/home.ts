import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RecipesApi } from '@api/recipes.api';
import { Recipe } from '@models/recipes/recipe';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { LanguageService } from '@translation/language.service';
import { finalize, of } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
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
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly api = inject(RecipesApi);
  private readonly lang = inject(LanguageService);
  private readonly authStore = inject(AuthStore);

  // =========================================================
  // State
  // =========================================================
  private readonly fetchTrigger = signal(0);
  readonly loading = signal(false);
  readonly auth = this.authStore.isAuthenticated;
  readonly errorMessage = signal<string | null>(null);

  // =========================================================
  // Observable Streams
  // =========================================================
  readonly dailyRecipe = toSignal(
    toObservable(this.fetchTrigger).pipe(
      tap(() => this.loading.set(true)),
      switchMap(() =>
        this.api.dailyRecipe().pipe(
          catchError(() => {
            this.lang.setMsg('messages.error.recipeFetchingDaily', undefined);
            this.errorMessage.set(this.lang.getMessageSignal()());
            return of(null);
          }),
          finalize(() => this.loading.set(false)),
        ),
      ),
      startWith(MOCK_RECIPES[0] as Recipe),
    ),
    { initialValue: (MOCK_RECIPES[0] as Recipe) ?? null },
  );

  ngOnInit(): void {
    this.fetchDailyRecipe();
  }

  fetchDailyRecipe(): void {
    this.fetchTrigger.update((t) => t + 1);
  }
}
