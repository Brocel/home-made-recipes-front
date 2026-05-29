import { Location } from '@angular/common';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { FEATURE_ROUTES } from '@utils/datas/feature-data.util';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  // =========================================================
  // Reactive URL tracking
  // =========================================================

  /**
   * Tracks the current URL as a signal.
   * Converts router NavigationEnd events into a reactive signal to enable
   * computed() and effect() patterns downstream.
   */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /**
   * Extracts active route segments (e.g., ['recipes', 'create'] from '/recipes/create').
   * Used by components to determine the current feature context.
   */
  readonly segments = computed(() => {
    const tree = this.router.parseUrl(this.url());
    const primary = tree.root.children['primary'];
    return primary ? primary.segments.map((s) => s.path) : [];
  });

  // =========================================================
  // Navigation API
  // =========================================================

  /**
   * Generic navigation. Accepts an array of route commands.
   */
  go(commands: unknown[], extras?: NavigationExtras) {
    return this.safeNavigate(commands, extras);
  }

  /**
   * Navigate to a single path segment (e.g., 'recipes').
   */
  goTo(path: string) {
    return this.safeNavigate([path]);
  }

  /**
   * Navigate to a feature under the home boundary (e.g., goToFeature(['recipes', 'create']).
   */
  goToFeature(path: string[]) {
    const newPath = [FEATURE_ROUTES.home, ...path];
    return this.safeNavigate(newPath);
  }

  /**
   * Navigate to the home/root route.
   */
  goHome(): Promise<boolean> {
    return this.safeNavigate(['/']);
  }

  /**
   * Alias for go(). Preferred in some call sites for semantic clarity.
   */
  navigate(commands: unknown[], extras?: NavigationExtras): Promise<boolean> {
    return this.safeNavigate(commands, extras);
  }

  /**
   * Wraps router.navigate() with error handling to prevent uncaught promise rejections.
   */
  private async safeNavigate(commands: unknown[], extras?: NavigationExtras): Promise<boolean> {
    try {
      return await this.router.navigate(commands, extras);
    } catch (err) {
      console.warn('Navigation failed', err);
      return false;
    }
  }

  // =========================================================
  // Prefilled navigation
  // =========================================================

  /**
   * Navigate with optional state to pre-fill forms on arrival.
   * State is loosely typed (any) to allow flexible form data shapes.
   * Consumed by components via router.getCurrentNavigation()?.extras.state.
   */
  goToRecipeList(prefill?: { [k: string]: any }): Promise<boolean> {
    return this.safeNavigate(['/recipes'], { state: prefill });
  }

  goToAddRecipeFull(prefill?: { [k: string]: any }): Promise<boolean> {
    return this.safeNavigate(['/recipes/create'], { state: prefill });
  }

  goToRecipeFull(prefill?: { [k: string]: any }): Promise<boolean> {
    return this.safeNavigate(['/recipes/see'], { state: prefill });
  }

  goToAdvancedSearch(prefill?: { [k: string]: any }): Promise<boolean> {
    return this.safeNavigate(['/recipes/search'], { state: prefill });
  }

  // =========================================================
  // Back navigation
  // =========================================================

  /**
   * Navigate back in browser history if available, otherwise go to fallback.
   * Checks window.history.length to determine if back is safe.
   */
  back(fallback = '/'): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void this.router.navigateByUrl(fallback);
    }
  }

  /**
   * Alternative back strategy using Location service.
   * Requires a stricter history depth check (> 2) for robustness.
   * TODO: unify with back() or document the distinction.
   */
  goBack(location: Location) {
    const canGoBack: boolean = window.history.length > 2;

    if (canGoBack) {
      location.back();
    } else {
      void this.goHome();
    }
  }
}
