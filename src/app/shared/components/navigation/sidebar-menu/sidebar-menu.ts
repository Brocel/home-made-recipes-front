import { Component, input, output } from '@angular/core';
import { MenuItem } from '@models/features/menu-item.model';
import { SidebarMenuItem } from '../sidebar-menu-item/sidebar-menu-item';

@Component({
  selector: 'app-sidebar-menu',
  imports: [SidebarMenuItem],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  // =========================================================
  // Inputs
  // =========================================================
  items = input<MenuItem[]>([]);
  expanded = input(false);
  activePath = input<string[]>([]);

  // =========================================================
  // Outputs
  // =========================================================
  navigate = output<string[]>();

  // =========================================================
  // Computed classes
  // =========================================================

  // =========================================================
  // Helpers
  // =========================================================
  isActive(item: MenuItem): boolean {
    return item.path.some((segment, index) => this.activePath()[index] === segment);
  }

  onNavigate(path: string[]) {
    this.navigate.emit(path);
  }
}
