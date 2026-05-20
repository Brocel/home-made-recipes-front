import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { AppButton } from '@primitives/app-button/app-button';

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
  data = input.required<any>();

  // =========================================================
  // Outputs
  // =========================================================
  confirmed = output<any>();
  cancelled = output<void>();

  // =========================================================
  // State
  // =========================================================
  variant = computed(() => this.data().variant);
  intent = computed(() => this.data().intent);
  message = computed(() => this.data().message);
  title = computed(() => this.data().title);
  confirmLabel = computed(() => this.data().confirmLabel ?? 'common.ok');
  cancelLabel = computed(() => this.data().cancelLabel ?? 'common.cancel');
  actionData = computed(() => this.data().actionData); // See how to use in service

  icon = computed(() => {
    switch (this.intent()) {
      case 'delete':
        return '🗑️';
      case 'update':
        return '✏️';
      case 'create':
        return '✅';
      default:
        return '❓';
    }
  });

  // =========================================================
  // Ng Classes
  // =========================================================
  classes = computed(() => ({
    confirm: true,
    [`confirm--${this.intent()}`]: true, // adapt scss logic with intent
  }));
}
