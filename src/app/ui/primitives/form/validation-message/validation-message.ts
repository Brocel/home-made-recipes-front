import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  ValidationDisplayMode,
  ValidationMessageMap,
  ValidationMessageOptions,
} from '@forms/types/validation.type';
import { resolveValidationMessage } from '@forms/utils/validation.utils';
import { DEFAULT_VALIDATION_PRIORITY } from '@forms/validations/validation.constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  templateUrl: './validation-message.html',
  styleUrl: './validation-message.scss',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessage {
  readonly control = input<AbstractControl | null>(null);
  readonly group = input<AbstractControl | null>(null);
  readonly messages = input.required<ValidationMessageMap>();

  readonly submitted = input(false);
  readonly showWhen = input<ValidationDisplayMode>('touched');
  readonly fallback = input<string | null>(null);
  readonly priority = input<readonly string[]>(DEFAULT_VALIDATION_PRIORITY);

  readonly message = computed(() =>
    resolveValidationMessage(
      this.control(),
      this.messages(),
      {
        showWhen: this.showWhen(),
        fallback: this.fallback(),
        priority: this.priority(),
      } satisfies ValidationMessageOptions,
      this.submitted(),
      this.group(),
    ),
  );
}
