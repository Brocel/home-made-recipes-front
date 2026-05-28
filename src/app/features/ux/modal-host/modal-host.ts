import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingSurface } from '@overlays/floating-surface/floating-surface';
import { ConfirmPopup } from '@primitives/confirm-popup/confirm-popup';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';
import { ModalDefinitionMap, ModalStackItem } from '@uiModels/modal.model';
import { ModalOrchestratorService } from '@uiServices/modal-orchestrator.service';
import { ModalService } from '@uiServices/modal.service';
import { ModalType } from '@uiTypes/modal.types';
import { LayerType, Placement, Position } from '@uiTypes/overlay.types';
import { Profile } from '@user/profile/profile';

@Component({
  selector: 'app-modal',
  imports: [FloatingSurface, Login, Register, Profile, ConfirmPopup, NgClass, TranslatePipe],
  templateUrl: './modal-host.html',
  styleUrl: './modal-host.scss',
})
export class ModalHost {
  // =========================================================
  // Dependencies
  // =========================================================
  private modalService = inject(ModalService);
  private orchestrator = inject(ModalOrchestratorService);

  // =========================================================
  // Porperties
  // =========================================================
  position: Position = 'viewport';
  placement: Placement = 'center';
  layer: LayerType = 'modal';

  // =========================================================
  // State
  // =========================================================
  modals = this.modalService.modals;
  currentItem = computed(() => this.modalService.currentItem());

  // =========================================================
  // Helpers
  // =========================================================
  /**
   * Compute CSS classes and properties for a modal item.
   * Used in template loop to apply consistent styling and positioning.
   */
  getItemClasses(item: ModalStackItem): Record<string, boolean> {
    const variant = item.config.variant ?? 'surface';
    const tone = item.config.tone ?? 'glass';
    const type = item.config.type;
    const isTop = item === this.currentItem();

    return {
      [`modal--variant-${variant}`]: true,
      [`modal--tone-${tone}`]: true,
      [`modal-host--${type}`]: true,
      'is-top': isTop,
      'is-background': !isTop,
    };
  }

  /**
   * Extract typed data from modal configuration.
   * Provides type-safe access to modal-specific data payloads.
   */
  getData<T extends ModalType>(item: ModalStackItem): ModalDefinitionMap[T]['data'] {
    return item.config.data;
  }

  // =========================================================
  // Actions
  // =========================================================
  close(id?: string): void {
    this.modalService.close(id);
  }

  /**
   * Handle login modal success.
   * Delegates to orchestrator for auth/navigation workflow.
   */
  onLoginSuccess() {
    this.orchestrator.handleLoginSuccess();
  }

  /**
   * Handle user clicking "Register" link in login modal.
   * Delegates to orchestrator for modal chain workflow.
   */
  onRegisterClick() {
    this.orchestrator.handleRegisterClick();
  }

  /**
   * Handle register modal success.
   * Delegates to orchestrator for auth/modal chain workflow.
   * @param email The email address used in registration, passed to login modal.
   */
  onRegisterSuccess(email: string) {
    this.orchestrator.handleRegisterSuccess(email);
  }

  /**
   * Handle confirm modal action.
   * Generic handler for confirm modals (not auth-specific).
   */
  onConfirm(actionData: unknown) {
    this.modalService.resolveCurrent({ confirmed: true, actionData });
  }

  /**
   * Handle confirm modal cancellation.
   * Generic handler for confirm modals (not auth-specific).
   */
  onCancel() {
    this.modalService.resolveCurrent({ confirmed: false });
  }
}
