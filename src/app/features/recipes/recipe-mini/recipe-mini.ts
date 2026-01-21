import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Recipe } from '@models/recipes/recipe';

@Component({
  selector: 'app-recipe-mini',
  imports: [TranslatePipe],
  templateUrl: './recipe-mini.html',
  styleUrl: './recipe-mini.scss',
})
export class RecipeMini {
  @Input() recipe: Recipe | null | undefined = undefined;
}
