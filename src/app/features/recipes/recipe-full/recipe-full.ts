import { Component, Input } from '@angular/core';
import { Recipe } from '@app/shared/models/recipes/recipe';

@Component({
  selector: 'app-recipe-full',
  imports: [],
  templateUrl: './recipe-full.html',
  styleUrl: './recipe-full.scss'
})
export class RecipeFull {
  @Input() recipe: Recipe | null | undefined = undefined;

}
