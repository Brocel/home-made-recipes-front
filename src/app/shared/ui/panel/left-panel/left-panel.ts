import { Component, signal } from '@angular/core';
import { MiniSearch } from '@app/features/recipes/search/mini-search/mini-search';
import { AddRecipeMini } from '@app/features/recipes/add/add-recipe-mini/add-recipe-mini';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [MiniSearch, AddRecipeMini],
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

  onOpenCreateFull(payload: { title?: string; type?: string }) {
    console.log('open create full', payload);
  }
}
