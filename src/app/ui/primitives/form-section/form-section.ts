import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  imports: [],
  templateUrl: './form-section.html',
  styleUrl: './form-section.scss',
})
export class FormSection {
  // =========================================================
  // Inputs
  // =========================================================
  title = input<string>('');
  description = input<string>('');
}
