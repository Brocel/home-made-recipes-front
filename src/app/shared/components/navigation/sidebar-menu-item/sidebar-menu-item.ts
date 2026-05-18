import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MenuItem } from '@models/features/menu-item.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [NgClass, TranslatePipe],
  templateUrl: './sidebar-menu-item.html',
  styleUrl: './sidebar-menu-item.scss',
})
export class SidebarMenuItem {
  // =========================================================
  // Inputs
  // =========================================================

  item = input.required<MenuItem>();
  expanded = input(false);
  active = input(false);

  // =========================================================
  // Outputs
  // =========================================================
  navigate = output<string[]>();

  // =========================================================
  // Computed classes
  // =========================================================
  classes = computed(() => ({
    item: true,
    'item--expanded': this.expanded(),
    'item--collapsed': !this.expanded(),
    'is-active': this.active(),
  }));

  // =========================================================
  // Actions
  // =========================================================
  onClick() {
    this.navigate.emit(this.item().path);
  }
}
