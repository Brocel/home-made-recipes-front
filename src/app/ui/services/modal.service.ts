import { computed, Injectable, signal } from '@angular/core';
import { ModalStackItem } from '@uiModels/modal.model';
import { AnyModalConfig, ModalResult, ModalType } from '@uiTypes/modal.types';
import { generateId } from '@utils/modal.util';

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
  // Actions
  // =========================================================
  open(config: AnyModalConfig): string {
    console.log('OPENING MODAL');
    const item: ModalStackItem = {
      id: generateId(),
      config,
    };

    this.stack.set(this.normalizeStack([...this.stack(), item]));

    return item.id;
  }

  openForResult<T extends ModalType>(config: AnyModalConfig): Promise<ModalResult<T>> {
    console.log('OPENING MODAL WITH PROMISE');
    return new Promise((resolve) => {
      const item: ModalStackItem = {
        id: generateId(),
        config,
        resolver: (result: unknown) => {
          resolve(result as ModalResult<T>);
        },
      };

      this.stack.set(this.normalizeStack([...this.stack(), item]));
    });
  }

  close(id?: string): void {
    console.log('CLOSING MODAL');
    if (!id) {
      const updated = this.stack().slice(0, -1);
      this.stack.set(this.normalizeStack(updated));
      return;
    }

    const updated = this.stack().filter((item) => item.id !== id);
    this.stack.set(this.normalizeStack(updated));
  }

  closeAll() {
    this.stack.set([]);
  }

  // =========================================================
  // Helpers
  // =========================================================
  resolveCurrent(result: unknown): void {
    const current = this.currentItem();

    if (!current) return;

    current.resolver?.(result);

    this.close();
  }

  private normalizeStack(stack: ModalStackItem[]): ModalStackItem[] {
    return stack.map((item, index) => ({
      ...item,
      zIndex: this.BASE_Z_INDEX + index,
      isTop: index === stack.length - 1,
    }));
  }
}
