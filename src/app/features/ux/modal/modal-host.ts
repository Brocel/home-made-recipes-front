import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationService } from '@nav/navigation.service';
import { FloatingSurface } from '@overlays/floating-surface/floating-surface';
import { ConfirmPopup } from '@primitives/confirm-popup/confirm-popup';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';
import { ModalDefinitionMap, ModalStackItem } from '@uiModels/modal.model';
import { ModalService } from '@uiServices/modal.service';
import { ModalType } from '@uiTypes/modal.types';
import { LayerType, Placement, Position, Tone, Variant } from '@uiTypes/overlay.types';
import { Profile } from '@user/profile/profile';
import { buildLoginConfig, buildRegisterConfig } from '@utils/modal.util';

@Component({
  selector: 'app-modal',
  imports: [FloatingSurface, Login, Register, Profile, ConfirmPopup, NgClass],
  templateUrl: './modal-host.html',
  styleUrl: './modal-host.scss',
})
export class ModalHost {
  // =========================================================
  // Dependencies
  // =========================================================
  private modalService = inject(ModalService);
  private nav = inject(NavigationService);

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

  // =========================================================
  // Helpers
  // =========================================================
  getVariant(item: ModalStackItem): Variant {
    return item.config.variant ?? 'surface';
  }

  getTone(item: ModalStackItem): Tone {
    return item.config.tone ?? 'glass';
  }

  getIsTop(item: ModalStackItem): string {
    return item.isTop ? 'is-top' : 'is-background';
  }

  getType(item: ModalStackItem): ModalType {
    return item.config.type;
  }

  getData<T extends ModalType>(item: ModalStackItem): ModalDefinitionMap[T]['data'] {
    return item.config.data;
  }

  // =========================================================
  // Actions
  // =========================================================
  close(id?: string): void {
    this.modalService.close(id);
  }

  // Login Modal
  onLoginSuccess() {
    this.close();
    this.nav.goHome();
  }

  onRegisterClick() {
    this.close();
    this.modalService.open(buildRegisterConfig());
  }

  // Register Modal
  onRegisterSuccess(email: string) {
    this.close();
    this.modalService.open(buildLoginConfig(email));
  }

  // Confirm Modal
  onConfirm(actionData: any) {
    this.modalService.resolveCurrent({ confirmed: true, actionData });
  }

  onCancel() {
    this.modalService.resolveCurrent({ confirmed: false });
  }
}
