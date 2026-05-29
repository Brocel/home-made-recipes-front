import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { STEP_VALIDATION_MESSAGES } from '@forms/validations/recipe.validation';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormTextarea } from '@primitives/form/form-textarea/form-textarea';

@Component({
  selector: 'app-recipe-steps',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, AppButton, FormField, FormInput, FormTextarea],
  templateUrl: './recipe-steps.html',
  styleUrl: './recipe-steps.scss',
})
export class RecipeSteps {
  // =========================================================
  // Inputs
  // =========================================================
  readonly steps = input.required<FormArray<FormGroup>>();
  readonly submitted = input(false);

  // =========================================================
  // Outputs
  // =========================================================
  readonly removeStep = output<number>();

  protected readonly messages = STEP_VALIDATION_MESSAGES;

  get stepsControls(): FormGroup[] {
    return this.steps().controls as FormGroup[];
  }

  onRemoveStep(index: number): void {
    this.removeStep.emit(index);
  }
}
