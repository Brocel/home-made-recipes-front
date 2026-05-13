import { Location } from '@angular/common';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { FEATURE_ROUTES } from '@utils/datas/feature-data.util';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  // URL helpers
  private url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly segments = computed(() => {
    const tree = this.router.parseUrl(this.url());
    const primary = tree.root.children['primary'];
    return primary ? primary.segments.map((s) => s.path) : [];
  });

  // Navigation methods
  go(commands: any[], extras?: any) {
    return this.safeNavigate(commands, extras);
  }

  goTo(path: string) {
    return this.safeNavigate([path]);
  }

  goToFeature(path: string[]) {
    const newPath = [FEATURE_ROUTES.home, ...path];
    console.log('newPath :: ' + newPath);
    return this.safeNavigate(newPath);
  }

  // navigation simple
  goHome(): Promise<boolean> {
    return this.safeNavigate(['/']);
  }

  navigate(commands: any[], extras?: any): Promise<boolean> {
    return this.safeNavigate(commands, extras);
  }

  // internal helper
  private async safeNavigate(commands: any[], extras?: any): Promise<boolean> {
    try {
      return await this.router.navigate(commands, extras);
    } catch (err) {
      console.warn('Navigation failed', err);
      return false;
    }
  }

  // navigation avec state utile pour préremplir formulaires
  // TODO: refacto
  goToRecipeList(prefill?: any): Promise<boolean> {
    return this.safeNavigate(['/recipes'], { state: prefill });
  }
  goToAddRecipeFull(prefill?: any): Promise<boolean> {
    return this.safeNavigate(['/recipes/create'], { state: prefill });
  }
  goToRecipeFull(prefill?: any): Promise<boolean> {
    return this.safeNavigate(['/recipes/see'], { state: prefill });
  }
  goToAdvancedSearch(prefill?: any): Promise<boolean> {
    return this.safeNavigate(['/recipes/search'], { state: prefill });
  }

  // back with fallback
  back(fallback = '/'): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigateByUrl(fallback);
    }
  }

  // Other back solution
  goBack(location: Location) {
    const canGoBack: boolean = window.history.length > 2;

    if (canGoBack) {
      location.back();
    } else {
      this.goHome();
    }
  }

  goToProfile() {
    // TODO
  }
}
