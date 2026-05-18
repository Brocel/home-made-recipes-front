import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Login } from '@signin/login/login';
import { Register } from '@signin/register/register';
import { ModalService } from '@ui/surfaces/core/modal.service';
import { ModalDataMap } from '@ui/surfaces/core/modal.types';
import { FloatingSurface } from '@ui/surfaces/floating-surface/floating-surface';
import {
  LayerType,
  OpeningStrategy,
  Placement,
  Position,
  Tone,
  Variant,
} from '@ui/surfaces/primitives/surface.types';

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
  loginData = computed(
    () =>
      (this.modal()?.type === 'login' ? this.modal()?.data : undefined) as ModalDataMap['login'],
  );
  // TODO: registerData

  // =========================================================
  // Actions
  // =========================================================
  close(): void {
    this.modalService.close();
  }
}
