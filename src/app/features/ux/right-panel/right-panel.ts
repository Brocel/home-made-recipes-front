import { Component, signal } from '@angular/core';
import { SidePosition } from '@appTypes/style.type';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { AddPartialRecipe } from '@recipes/add/add-partial-recipe/add-partial-recipe';
import { MiniSearch } from '@recipes/search/mini-search/mini-search';
import { ScrollWrapper } from '@ui/layout/scroll-wrapper/scroll-wrapper';
import { SideDrawer } from '@ui/layout/side-drawer/side-drawer';

@Component({
  selector: 'app-right-panel',
  imports: [ScrollWrapper, SideDrawer, ClickOutsideDirective, AddPartialRecipe, MiniSearch],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.scss',
})
export class RightPanel {
  isOpen = signal(false);

  position: SidePosition = 'right';
  width = '500px';

  close() {
    this.isOpen.update(() => false);
  }

  onMiniSearch(query: string) {
    console.log('search', query);
    // TODO
  }
}
