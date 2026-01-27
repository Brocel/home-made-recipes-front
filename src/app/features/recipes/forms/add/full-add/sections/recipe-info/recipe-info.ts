import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-info',
  imports: [],
  templateUrl: './recipe-info.html',
  styleUrl: './recipe-info.scss',
})
export class RecipeInfo {
  @Input() form!: FormGroup;
}
