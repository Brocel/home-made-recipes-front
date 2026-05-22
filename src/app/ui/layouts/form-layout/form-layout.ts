import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-layout.html',
  styleUrl: './form-layout.scss',
})
export class FormLayout {
  // =========================================================
  // Configuration inputs
  // =========================================================
  readonly title = input('');
  readonly subtitle = input('');

  /**
   * Compact vertical spacing.
   */
  readonly compact = input(false);

  // =========================================================
  // Classes
  // =========================================================
  protected readonly classes = computed(() => ({
    'form-layout': true,
    'form-layout--compact': this.compact(),
  }));
}
