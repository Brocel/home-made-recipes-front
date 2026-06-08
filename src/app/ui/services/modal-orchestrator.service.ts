import { inject, Injectable } from '@angular/core';
import { NavigationService } from '@nav/navigation.service';
import { buildLoginConfig, buildRegisterConfig } from '@utils/modal.util';
import { ModalService } from './modal.service';

/**
 * ModalOrchestrator handles auth-specific workflows involving modals.
 * Decouples ModalHost (generic) from auth/navigation concerns.
 *
 * Examples:
 * - User logs in → close modal → navigate to home
 * - User clicks register → close login modal → open register modal
 * - User finishes registration → close register → open login with email prefill
 */
@Injectable({ providedIn: 'root' })
export class ModalOrchestratorService {
  private readonly modal = inject(ModalService);
  private readonly nav = inject(NavigationService);

  /**
   * Handle successful login completion.
   * Closes modal and navigates to home.
   */
  handleLoginSuccess() {
    this.modal.close();
    this.nav.goHome();
  }

  /**
   * Handle user clicking "Register" link in login modal.
   * Closes login modal and opens register modal.
   */
  handleRegisterClick() {
    this.modal.close();
    this.modal.open(buildRegisterConfig());
  }

  /**
   * Handle user clicking "Login" link in register modal.
   * Closes register modal and opens login modal.
   */
  handleLoginClick() {
    this.modal.close();
    this.modal.open(buildLoginConfig());
  }

  /**
   * Handle successful registration completion.
   * Closes register modal and opens login modal with registered email prefilled.
   */
  handleRegisterSuccess(email: string) {
    this.modal.close();
    this.modal.open(buildLoginConfig(email));
  }
}
