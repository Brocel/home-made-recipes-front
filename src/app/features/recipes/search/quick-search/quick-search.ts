import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '@shared/ui/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'quick-search',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, TranslatePipe],
  templateUrl: './quick-search.html',
  styleUrls: ['./quick-search.scss']
})
export class QuickSearch {
  query = '';
  @Output() search = new EventEmitter<string>();

  submit() {
    this.search.emit(this.query.trim());
  }
}
