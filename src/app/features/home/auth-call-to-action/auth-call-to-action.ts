import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@shared/ui/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'auth-cta',
  standalone: true,
  imports: [CommonModule, Button, TranslatePipe],
  templateUrl: './auth-call-to-action.html',
  styleUrls: ['./auth-call-to-action.scss']
})
export class AuthCallToAction {
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
}
