import { inject, Injectable } from '@angular/core';
import { ModalService } from '@ui/surfaces/core/modal.service';

@Injectable({ providedIn: 'root' })
export class AuthUIService {
  private modal = inject(ModalService);

  // =========================================================
  // Login
  // =========================================================
  openLogin(email?: string): void {
    this.modal.open({
      type: 'login',
      data: {
        email: email ?? undefined,
      },
    });
  }

  // =========================================================
  // Register
  // =========================================================
  openRegister(): void {
    this.modal.open({
      type: 'register',
    });
  }

  // =========================================================
  // Close
  // =========================================================
  close(): void {
    this.modal.close();
  }
}
