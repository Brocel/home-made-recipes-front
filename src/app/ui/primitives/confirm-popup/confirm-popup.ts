import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { AppButton } from '@primitives/app-button/app-button';
import { ConfirmData } from '@uiTypes/modal.types';

@Component({
  selector: 'app-confirm-popup',
  imports: [NgClass, AppButton],
  templateUrl: './confirm-popup.html',
  styleUrl: './confirm-popup.scss',
})
export class ConfirmPopup {
  // =========================================================
  // Inputs
  // =========================================================
  data = input.required<ConfirmData>();

  // =========================================================
  // Outputs
  // =========================================================
  confirmed = output<void>();
  cancelled = output<void>();

  // =========================================================
  // State
  // =========================================================
  type = computed(() => this.data().type);
  message = computed(() => this.data().message);
  title = computed(() => this.data().title);
  confirmLabel = computed(() => this.data().confirmLabel ?? 'common.ok');
  cancelLabel = computed(() => this.data().cancelLabel ?? 'common.cancel');

  confirmButtonVariant = computed(() => {
    switch (this.type()) {
      case 'delete':
      case 'error':
        return 'danger';

      case 'success':
        return 'success';

      case 'update':
      case 'create':
        return 'primary';

      default:
        return 'primary';
    }
  });

  // =========================================================
  // Ng Classes
  // =========================================================
  classes = computed(() => ({
    confirm: true,
    [`confirm--${this.type()}`]: true,
  }));
}
