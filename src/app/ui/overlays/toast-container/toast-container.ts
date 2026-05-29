import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from '@primitives/toast/toast';
import { ToasterService } from '@uiServices/toaster.service';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, Toast],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly toasterService = inject(ToasterService);
  private readonly translate = inject(TranslateService);

  // =========================================================
  // State
  // =========================================================
  readonly toasts = this.toasterService.toasts;

  // =========================================================
  // Actions
  // =========================================================
  translateMessage(messageKey: string): string {
    return this.translate.instant(messageKey);
  }

  onDismiss(id: string): void {
    this.toasterService.remove(id);
  }
}
