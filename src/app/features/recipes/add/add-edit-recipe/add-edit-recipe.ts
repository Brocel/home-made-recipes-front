import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecipesApi } from '@api/recipes.api';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormSection } from '@primitives/form/form-section/form-section';
import { NotificationService } from '@services/notification.service';
import { RecipeFormService } from '@services/recipe-form.service';
import { ScrollWrapper } from '../../../../ui/overlays/scroll-wrapper/scroll-wrapper';
import { RecipeInfo } from './sections/recipe-info/recipe-info';
import { RecipeIngredients } from './sections/recipe-ingredients/recipe-ingredients';
import { RecipeSteps } from './sections/recipe-steps/recipe-steps';

@Component({
  selector: 'app-full-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    ScrollWrapper,
    AppButton,
    RecipeInfo,
    RecipeIngredients,
    RecipeSteps,
    FormLayout,
    FormSection,
  ],
  templateUrl: './add-edit-recipe.html',
  styleUrl: './add-edit-recipe.scss',
})
export class AddEditRecipe implements OnInit {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly formService = inject(RecipeFormService);
  private readonly recipesApi = inject(RecipesApi);
  private readonly notif = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly submitted = signal(false);

  // =========================================================
  // Form
  // =========================================================
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formService.createForm();
  }

  constructor() {
    effect(() => {
      const payload = this.formService.payload();
      if (payload) {
        this.formService.patchStateValue(this.form, payload);
        this.formService.clearPayload();
      }
    });
  }

  // =========================================================
  // Helpers
  // =========================================================
  get ingredient_list(): FormArray {
    return this.form.get('ingredient_list') as FormArray;
  }

  get step_list(): FormArray {
    return this.form.get('step_list') as FormArray;
  }

  get informations(): FormGroup {
    return this.form.get('informations') as FormGroup;
  }

  // =========================================================
  // Actions
  // =========================================================
  onAddIngredient(): void {
    this.ingredient_list.push(this.formService.createIngredient());
  }

  onRemoveIngredient(index: number): void {
    this.ingredient_list.removeAt(index);
  }

  onAddStep(): void {
    const order = this.step_list.length;
    this.step_list.push(this.formService.createStep(order));
  }

  onRemoveStep(index: number): void {
    this.step_list.removeAt(index);
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const dto = this.formService.toDto(this.form);

    this.recipesApi
      .create(dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.notif.showSuccess('recipe.created_successfully');
          this.form.reset();
          this.submitted.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.notif.showError(err.message ?? 'UNKNOWN_ERROR');
        },
      });
  }
}
