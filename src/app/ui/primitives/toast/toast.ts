import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Toast as ToastModel } from '@uiModels/toast.model';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  // =========================================================
  // Inputs
  // =========================================================
  readonly toast = input.required<ToastModel>();
  readonly message = input.required<string>();

  // =========================================================
  // Outputs
  // =========================================================
  readonly dismiss = output<void>();

  // =========================================================
  // Actions
  // =========================================================
  onDismiss(): void {
    this.dismiss.emit();
  }
}
