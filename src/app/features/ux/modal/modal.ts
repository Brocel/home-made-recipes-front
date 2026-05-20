import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NavigationService } from '@nav/navigation.service';
import { FloatingSurface } from '@overlays/floating-surface/floating-surface';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';
import { ModalService } from '@uiServices/modal.service';
import { ModalDataMap } from '@uiTypes/modal.types';
import { LayerType, Placement, Position } from '@uiTypes/overlay.types';
import { Profile } from '@user/profile/profile';
import { buildLoginConfig, buildRegisterConfig } from '@utils/modal.util';

@Component({
  selector: 'app-modal',
  imports: [FloatingSurface, Login, Register, Profile, NgClass],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
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
  modal = computed(() => this.modalService.modal());
  isOpen = computed(() => this.modalService.isOpen());

  // =========================================================
  // NgClasses
  // =========================================================
  classes = computed(() => ({
    'modal-host': true,
    [`modal--variant-${this.variant()}`]: true,
    [`modal--tone-${this.tone()}`]: true,
  }));

  // =========================================================
  // Helpers
  // =========================================================
  type = computed(() => this.modal()?.type);
  variant = computed(() => this.modal()?.variant ?? 'surface');
  tone = computed(() => this.modal()?.tone ?? 'glass');

  // Login Modal
  loginData = computed(
    () =>
      (this.modal()?.type === 'login' ? this.modal()?.data : undefined) as ModalDataMap['login'],
  );
  // Profile Modal
  profileData = computed(
    () =>
      (this.modal()?.type === 'profile'
        ? this.modal()?.data
        : undefined) as ModalDataMap['profile'],
  );
  // Confirm Modal
  confirmData = computed(
    () =>
      (this.modal()?.type === 'confirm'
        ? this.modal()?.data
        : undefined) as ModalDataMap['confirm'],
  );
  confirmType = computed(() => this.confirmData()?.type);
  confirmMessage = computed(() => this.confirmData()?.message);

  // =========================================================
  // Actions
  // =========================================================
  close(): void {
    this.modalService.close();
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
}
