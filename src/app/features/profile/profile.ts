import { Component, Input, signal } from '@angular/core';
import { User } from '@app/shared/models/user';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  @Input() user: User | null | undefined = undefined;

  isEditing = signal(false);
}
