import { Component, computed, inject, signal } from '@angular/core';

import { NavigationService } from '@nav/navigation.service';
import { RouteContextService } from '@nav/route-context.service';
import { SideRail } from '@overlays/side-rail/side-rail';
import { SidebarMenu } from '@primitives/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [SideRail, SidebarMenu],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.scss'],
})
export class LeftPanel {
  // =========================================================
  // Dependencies
  // =========================================================
  private nav = inject(NavigationService);
  private routeContext = inject(RouteContextService);

  // =========================================================
  // State
  // =========================================================
  isOpen = signal(false);
  items = computed(() => this.routeContext.menu() ?? []);
  activePath = computed(() => this.nav.segments().slice(1));
  drawerWidth = computed(() => {
    return this.isOpen() ? '240px' : '72px';
  });

  // =========================================================
  // Actions
  // =========================================================
  close() {
    this.isOpen.set(false);
  }

  navigate(path: string[]) {
    this.nav.goToFeature(path);
  }
}
