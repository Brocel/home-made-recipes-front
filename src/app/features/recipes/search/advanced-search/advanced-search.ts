import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'advanced-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './advanced-search.html',
  styleUrls: ['./advanced-search.scss'],
})
export class AdvancedSearch {
  form;

  @Output() submitAdvanced = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      q: [''],
      // autres champs à définir plus tard
    });
  }

  submit() {
    this.submitAdvanced.emit(this.form.value);
  }
}
