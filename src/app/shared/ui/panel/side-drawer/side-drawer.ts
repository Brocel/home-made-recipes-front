import { Component, input, output } from '@angular/core';
import { SidePosition } from '../../../types/element.type';

@Component({
  selector: 'app-side-drawer',
  imports: [],
  templateUrl: './side-drawer.html',
  styleUrl: './side-drawer.scss',
})
export class SideDrawer {
  // Inputs
  open = input(false);
  position = input.required<SidePosition>();
  width = input<string>('400px');

  // Outputs
  openChange = output<boolean>();

  toggle() {
    this.openChange.emit(!this.open);
  }
}
