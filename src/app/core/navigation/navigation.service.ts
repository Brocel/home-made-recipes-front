// src/app/core/navigation/navigation.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@app/core/i18n/language.service';
import { AdvancedSearch } from '@features/recipes/search/advanced-search/advanced-search';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router, private lang: LanguageService) {}

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

  // ouvrir modal via outlet auxiliaire nommé "modal"
  openLoginModal(): Promise<boolean> {
    return this.safeNavigate([{ outlets: { modal: ['login'] } }]);
  }

  closeModal(): Promise<boolean> {
    return this.safeNavigate([{ outlets: { modal: null } }]);
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
}
