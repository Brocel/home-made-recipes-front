import { Injectable, signal } from '@angular/core';
import { Toast } from '@uiModels/toast.model';
import { ToastType } from '@uiTypes/primitive.types';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private readonly TOAST_DURATION = 5000;

  // =========================================================
  // State
  // =========================================================
  private readonly toastStack = signal<Toast[]>([]);
  readonly toasts = this.toastStack.asReadonly();

  // =========================================================
  // Private helpers
  // =========================================================
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  // =========================================================
  // Public API
  // =========================================================
  show(
    type: ToastType,
    messageKey: string,
    fallBackMessage?: string,
    messageParams?: Record<string, any>,
  ): void {
    const toast: Toast = {
      id: this.generateId(),
      type,
      messageKey,
      fallBackMessage,
      messageParams,
    };

    this.toastStack.set([...this.toastStack(), toast]);

    // Auto-dismiss after duration
    setTimeout(() => {
      this.remove(toast.id);
    }, this.TOAST_DURATION);
  }

  remove(id: string): void {
    this.toastStack.set(this.toastStack().filter((t) => t.id !== id));
  }
}
