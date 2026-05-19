import { computed, Injectable, signal } from '@angular/core';
import { ModalConfig } from '../types/modal.types';

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
  isOpen = computed(() => this.currentModal() !== undefined && this.opened());

  // =========================================================
  // Actions
  // =========================================================
  open(config: ModalConfig): void {
    console.log('OPENING MODAL');
    this.currentModal.set(config);
    this.opened.set(true);
  }

  close(): void {
    console.log('CLOSING MODAL');
    this.currentModal.set(undefined);
    this.opened.set(false);
  }
}
