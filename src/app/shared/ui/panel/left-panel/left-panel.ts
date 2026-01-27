import { Component, signal } from '@angular/core';
import { MiniSearch } from '@features/recipes/forms/search/mini-search/mini-search';
import { MiniAdd } from '@features/recipes/forms/add/mini-add/mini-add';
import { RecipeType } from '@models/recipes/recipe-type.enum';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [MiniSearch, MiniAdd],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.scss'],
})
export class LeftPanel {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  onMiniSearch(query: string) {
    console.log('search', query);
  }
}
