import { computed, Injectable, signal } from '@angular/core';
import { generateId } from '@utils/modal.util';
import { ModalConfig, ModalResult, ModalStackItem, ModalType } from '../types/modal.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly BASE_Z_INDEX = 1000;
  // =========================================================
  // State
  // =========================================================
  stack = signal<ModalStackItem[]>([]);
  currentItem = computed(() => {
    const stack = this.stack();
    return stack.length > 0 ? stack[stack.length - 1] : null;
  });
  currentModal = computed(() => this.currentItem()?.config ?? null);

  readonly modals = this.stack.asReadonly();

  // =========================================================
  // Public signals
  // =========================================================
  isOpen = computed(() => this.stack().length > 0);

  // =========================================================
  // Helpers
  // =========================================================
  resolveCurrent<T extends ModalType>(result: ModalResult<T>): void {
    const current = this.currentItem();

    if (!current) return;

    current.resolver?.(result);

    this.close();
  }

  // =========================================================
  // Actions
  // =========================================================
  open<T extends ModalType>(config: ModalConfig<T>): string {
    console.log('OPENING MODAL');
    const level = this.stack().length;
    const item: ModalStackItem = {
      id: generateId(),
      config,
      zIndex: this.BASE_Z_INDEX + level,
      isTop: true,
    };

    const updated = this.stack().map((item) => ({
      ...item,
      isTop: false,
    }));

    this.stack.set([...updated, item]);

    return item.id;
  }

  openForResult<T extends ModalType>(config: ModalConfig<T>): Promise<ModalResult<T>> {
    return new Promise((resolve) => {
      const level = this.stack().length;
      const item: ModalStackItem = {
        id: generateId(),
        config,
        resolver: resolve,
        zIndex: this.BASE_Z_INDEX + level,
        isTop: true,
      };

      const updated = this.stack().map((item) => ({
        ...item,
        isTop: false,
      }));

      this.stack.set([...updated, item]);
    });
  }

  close(id?: string): void {
    console.log('CLOSING MODAL');
    if (!id) {
      this.stack.update((stack) => stack.slice(0, -1));
      return;
    }

    this.stack.update((stack) => stack.filter((item) => item.id !== id));
  }

  closeAll() {
    this.stack.set([]);
  }
}
