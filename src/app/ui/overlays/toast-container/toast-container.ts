import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Toast } from '@primitives/toast/toast';
import { LanguageService } from '@translation/language.service';
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
  private readonly langService = inject(LanguageService);

  // =========================================================
  // State
  // =========================================================
  readonly toasts = this.toasterService.toasts;

  // =========================================================
  // Actions
  // =========================================================
  translateMessage(
    messageKey: string,
    messageParams?: Record<string, any>,
    fallBackMessage?: string,
  ): string {
    return this.langService.instant(messageKey, {
      defaultValue: fallBackMessage,
      ...messageParams,
    });
  }

  onDismiss(id: string): void {
    this.toasterService.remove(id);
  }
}
