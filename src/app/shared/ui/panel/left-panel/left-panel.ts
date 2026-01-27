import { Component, signal } from '@angular/core';
import { MiniSearch } from '@app/features/recipes/forms/search/mini-search/mini-search';
import { MiniAdd } from '@app/features/recipes/forms/add/mini-add/mini-add';

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

  onOpenCreateFull(payload: { title?: string; type?: string }) {
    console.log('open create full', payload);
  }
}
