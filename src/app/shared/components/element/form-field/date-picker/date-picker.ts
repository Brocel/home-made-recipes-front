import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  imports: [FormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePicker {
  // =========================================================
  // Inputs
  // =========================================================
  value = input<string | null>(null);
  min = input<string | null>(null);
  max = input<string | null>(null);
  disabled = input(false);
  placeholder = input('dd/MM/yyyy');

  // =========================================================
  // Outputs
  // =========================================================
  valueChange = output<string>();

  // =========================================================
  // Events
  // =========================================================
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.valueChange.emit(target.value);
  }
}
