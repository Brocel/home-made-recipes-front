import { computed, Injectable, signal } from '@angular/core';
import { ModalCloseEvent, ModalStackItem } from '@uiModels/modal.model';
import { AnyModalConfig, ModalResult, ModalType } from '@uiTypes/modal.types';
import { generateId } from '@utils/modal.util';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly BASE_Z_INDEX = 1000;

  // =========================================================
  // Events
  // =========================================================
  private readonly closeSubject = new Subject<ModalCloseEvent>();
  readonly close$ = this.closeSubject.asObservable();

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
    const item: ModalStackItem = {
      id: generateId(),
      config,
    };

    this.stack.set(this.normalizeStack([...this.stack(), item]));

    return item.id;
  }

  openForResult<T extends ModalType>(config: AnyModalConfig): Promise<ModalResult<T>> {
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
    if (!id) {
      // Emit event for the top modal before removing it
      const current = this.currentItem();
      if (current) {
        this.closeSubject.next({ id: current.id, type: current.config.type });
      }

      const updated = this.stack().slice(0, -1);
      this.stack.set(this.normalizeStack(updated));
      return;
    }

    // Emit event for the specific modal before removing it
    const item = this.stack().find((m) => m.id === id);
    if (item) {
      this.closeSubject.next({ id: item.id, type: item.config.type });
    }

    const updated = this.stack().filter((item) => item.id !== id);
    this.stack.set(this.normalizeStack(updated));
  }

  closeAll() {
    // Emit close events for all modals before clearing
    this.stack().forEach((item) => {
      this.closeSubject.next({ id: item.id, type: item.config.type });
    });

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
