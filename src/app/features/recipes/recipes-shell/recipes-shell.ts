import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes-shell',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class RecipesShell {}
