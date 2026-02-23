import { Component, signal } from '@angular/core';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { MiniAdd } from '@features/recipes/forms/add/mini-add/mini-add';
import { MiniSearch } from '@features/recipes/forms/search/mini-search/mini-search';
import { ScrollWrapper } from '@layout/scroll-wrapper/scroll-wrapper';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [MiniSearch, MiniAdd, ScrollWrapper, ClickOutsideDirective],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.scss'],
})
export class LeftPanel {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.update((v) => false);
  }

  onMiniSearch(query: string) {
    console.log('search', query);
  }
}
