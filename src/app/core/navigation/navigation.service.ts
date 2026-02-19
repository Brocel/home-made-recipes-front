// src/app/core/navigation/navigation.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from '@features/auth/login/login';
import { Register } from '@features/auth/register/register';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

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

  // Modals
  openLoginModal(emailPrefill?: string): void {
    this.dialog.open(Login, {
      width: '30%',
      panelClass: 'app-modal-panel',
      autoFocus: true,
      restoreFocus: true,
      data: { email: emailPrefill ?? null },
    });
  }

  openRegisterModal(): void {
    this.dialog.open(Register, {
      width: '30%',
      panelClass: 'app-modal-panel',
      autoFocus: true,
      restoreFocus: true,
    });
  }

  closeAllModals(): void {
    this.dialog.closeAll();
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

  gotToProfile() {
    // TODO
  }
}
