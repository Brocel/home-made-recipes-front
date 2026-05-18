import { Injectable, signal } from '@angular/core';
import { ModalConfig } from './modal.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // =========================================================
  // State
  // =========================================================
  private readonly opened = signal(false);
  private readonly currentModal = signal<ModalConfig | undefined>(undefined);

  // =========================================================
  // Public signals
  // =========================================================
  modal = this.currentModal.asReadonly();
  isOpen = this.opened.asReadonly();

  // =========================================================
  // Actions
  // =========================================================
  open(config: ModalConfig): void {
    this.currentModal.set(config);
    this.opened.set(true);
  }

  close(): void {
    this.opened.set(false);
  }

  toggle(config: ModalConfig): void {
    const current = this.currentModal();

    if (this.isOpen() && current?.type === config.type) {
      this.close();
      return;
    }

    this.open(config);
  }
}
