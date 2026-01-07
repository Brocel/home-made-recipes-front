import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {Button} from '@ui/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-search',
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './advanced-search.html',
  styleUrl: './advanced-search.scss',
})
export class AdvancedSearch {
  form = this.fb.group({
    q: [''],
    // autres champs à définir plus tard
  });
  @Output() submitAdvanced = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
  }

  submit() {
    this.submitAdvanced.emit(this.form.value);
  }
}
