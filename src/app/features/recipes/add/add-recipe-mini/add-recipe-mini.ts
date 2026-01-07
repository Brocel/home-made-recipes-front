import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '@shared/ui/button/button';

@Component({
  selector: 'add-recipe-mini',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './add-recipe-mini.html',
  styleUrls: ['./add-recipe-mini.scss']
})
export class AddRecipeMini {
  title = '';
  type = '';

  @Output() openCreateFull = new EventEmitter<{ title?: string; type?: string }>();

  constructor(private router: Router) {}

  submit() {
    const payload = { title: this.title || undefined, type: this.type || undefined };
    // émettre l'événement pour que Home gère la navigation ou navigation directe :
    this.openCreateFull.emit(payload);
    // exemple de navigation (optionnel) :
    // this.router.navigate(['/recipes/create'], { state: payload });
  }
}
