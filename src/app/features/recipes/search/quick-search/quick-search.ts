import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '@shared/ui/button/button';

@Component({
  selector: 'quick-search',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './quick-search.html',
  styleUrls: ['./quick-search.scss']
})
export class SearchQuick {
  query = '';
  @Output() search = new EventEmitter<string>();

  submit() {
    this.search.emit(this.query.trim());
  }
}
