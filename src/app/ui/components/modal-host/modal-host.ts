import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';
import { FloatingSurface } from '@ui/overlays/floating-surface/floating-surface';
import { ModalService } from '@ui/services/modal.service';
import { ModalDataMap } from '@ui/types/modal.types';
import {
  LayerType,
  OpeningStrategy,
  Placement,
  Position,
  Tone,
  Variant,
} from '@ui/types/surface.types';

@Component({
  selector: 'app-modal-host',
  imports: [CommonModule, FloatingSurface, Login, Register],
  templateUrl: './modal-host.html',
  styleUrl: './modal-host.scss',
})
export class ModalHost {
  // =========================================================
  // Dependencies
  // =========================================================
  private modalService = inject(ModalService);

  // =========================================================
  // Porperties
  // =========================================================
  position: Position = 'viewport';
  placement: Placement = 'center';
  layer: LayerType = 'modal';
  strategy: OpeningStrategy = 'programmatic';
  variant: Variant = 'surface';
  tone: Tone = 'glass';

  // =========================================================
  // State
  // =========================================================
  modal = this.modalService.modal;
  isOpen = this.modalService.isOpen;

  // =========================================================
  // Typed data helpers
  // =========================================================
  type = computed(() => this.modal()?.type);
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

  // =========================================================
  // Actions
  // =========================================================
  close(): void {
    this.modalService.close();
  }
}
