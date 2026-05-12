import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';

@Injectable({ providedIn: 'root' })
export class AuthDialogService {
  private dialog = inject(MatDialog);

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
}
