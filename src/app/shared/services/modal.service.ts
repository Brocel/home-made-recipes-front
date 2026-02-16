import { Injectable, signal } from '@angular/core';

export type ModalType = 'login' | 'register' | null;

@Injectable({ providedIn: 'root' })
export class ModalService {
  modal = signal<ModalType>(null);

  open(type: ModalType) {
    this.modal.set(type);
  }

  close() {
    this.modal.set(null);
  }
}
