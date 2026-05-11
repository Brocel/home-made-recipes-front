import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RecipeCreateBridgeService } from '@app/shared/services/recipe-create-bridge.service';
import { ScrollWrapper } from '@layout/scroll-wrapper/scroll-wrapper';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeFormService } from '@services/recipe-form.service';
import { RecipeInfo } from './sections/recipe-info/recipe-info';
import { RecipeIngredients } from './sections/recipe-ingredients/recipe-ingredients';
import { RecipeSteps } from './sections/recipe-steps/recipe-steps';

@Component({
  selector: 'app-full-add',
  imports: [
    ReactiveFormsModule,
    RecipeInfo,
    RecipeIngredients,
    RecipeSteps,
    TranslatePipe,
    MatIcon,
    ScrollWrapper,
  ],
  templateUrl: './full-add.html',
  styleUrl: './full-add.scss',
})
export class FullAdd implements OnInit {
  private router = inject(Router);
  private formService = inject(RecipeFormService);
  private bridge = inject(RecipeCreateBridgeService);

  form!: FormGroup;

  bridgeEffect = effect(() => {
    const payload = this.bridge.payload();
    if (payload) {
      this.formService.patchStateValue(payload);
      this.bridge.clear();
    }
  });

  get ingredient_list(): FormArray {
    return this.formService.ingredientsArray;
  }
  get step_list(): FormArray {
    return this.formService.stepsArray;
  }

  ngOnInit() {
    this.form = this.formService.createForm();
  }

  submit() {
    if (this.form.invalid) return;
    const dto = this.formService.toDto();

    // TODO: call to api
  }
}
