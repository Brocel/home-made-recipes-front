import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-search.html',
  styleUrls: ['./quick-search.scss'],
})
export class QuickSearch {
  query = '';
  @Output() search = new EventEmitter<string>();
  @Input() placeholder: string | any | null = null;

  submit() {
    this.search.emit(this.query.trim());
  }
}
