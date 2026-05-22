import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snack = inject(MatSnackBar);
  private translate = inject(TranslateService);

  showSuccess(key: string): void {
    const message = this.translate.instant(key);

    this.snack.open(message, undefined, {
      duration: 5000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  showError(key: string): void {
    const message = this.translate.instant(key);

    this.snack.open(message, undefined, {
      duration: 5000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  // TODO: Notification model (msg:string, isError:boolean, etc...) + generic method + handle translate (error.key / success.key)
}
