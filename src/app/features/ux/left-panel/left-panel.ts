import { Component, signal } from '@angular/core';

import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { AddPartialRecipe } from '@recipes/add/add-partial-recipe/add-partial-recipe';
import { MiniSearch } from '@recipes/search/mini-search/mini-search';
import { ScrollWrapper } from '@ui/layout/scroll-wrapper/scroll-wrapper';
import { SideDrawer } from '@ui/panel/side-drawer/side-drawer';
import { SidePosition } from '../../../shared/types/style.type';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [ScrollWrapper, SideDrawer, ClickOutsideDirective, AddPartialRecipe, MiniSearch],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.scss'],
})
export class LeftPanel {
  isOpen = signal(false);

  position: SidePosition = 'left';
  width = '500px';

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.update(() => false);
  }

  onMiniSearch(query: string) {
    console.log('search', query);
    // TODO
  }
}
