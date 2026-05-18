import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BaseSize } from '@appTypes/style.type';
import { InputType } from '@appTypes/ui.primitive.type';
import { InputOption } from '@models/form/input-option.model';

@Component({
  selector: 'app-form-input',
  imports: [NgClass],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput {
  // =========================================================
  // Inputs
  // =========================================================
  type = input<InputType>('text');
  size = input<BaseSize>('md');
  placeholder = input('');
  value = input<string | number>('');

  disabled = input(false);
  invalid = input(false);

  // type-specific inputs
  rows = input(4);
  name = input('');
  checked = input(false);
  options = input<InputOption[]>([]);

  // =========================================================
  // Classes
  // =========================================================
  classes = computed(() => ({
    'form-input': true,

    [`form-input--${this.size()}`]: true,

    'is-invalid': this.invalid(),
  }));
}
