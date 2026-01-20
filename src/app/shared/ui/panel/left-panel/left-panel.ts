import { Component, signal } from '@angular/core';
import { QuickSearch } from '@app/features/recipes/search/quick-search/quick-search';
import { TranslatePipe } from '@ngx-translate/core';
import { AddRecipeMini } from '@app/features/recipes/add/add-recipe-mini/add-recipe-mini';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [TranslatePipe, QuickSearch, AddRecipeMini],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.scss']
})
export class LeftPanel {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  onSearch(query: string) {
    console.log('search', query);
  }

  onOpenCreateFull(payload: { title?: string; type?: string }) {
    console.log('open create full', payload);
  }
}
