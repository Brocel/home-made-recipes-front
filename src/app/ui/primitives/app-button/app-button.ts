import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from '@uiTypes/primitive.types';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
})
export class AppButton {
  // =========================
  // Inputs
  // =========================
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');

  disabled = input(false);
  loading = input(false);
  active = input(false);

  iconOnly = input(false);
  fullWidth = input(false);

  // =========================
  // Computed classes
  // =========================
  classes = computed(() => ({
    btn: true,

    [`btn--${this.variant()}`]: true,
    [`btn--${this.size()}`]: true,

    'is-active': this.active(),
    'is-loading': this.loading(),
    'is-disabled': this.disabled(),
    'btn--icon-only': this.iconOnly(),
    'btn--full': this.fullWidth(),
  }));
}
