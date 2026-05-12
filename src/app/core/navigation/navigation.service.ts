import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  go(commands: any[], extras?: any) {
    return this.safeNavigate(commands, extras);
  }

  // TODO: replace following by routes nav (cf refacto routes.ts)
  // navigation simple
  goHome(): Promise<boolean> {
    return this.safeNavigate(['/']);
  }

  navigate(commands: any[], extras?: any): Promise<boolean> {
    return this.safeNavigate(commands, extras);
  }

  // navigation avec state utile pour préremplir formulaires
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
    // simple fallback si history.back ne suffit pas
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigateByUrl(fallback);
    }
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

  goToProfile() {
    // TODO
  }
}
