import { Component, computed, inject, signal } from '@angular/core';
import { DashboardRightPanel } from '@dashboard/dashboard-right-panel/dashboard-right-panel';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { RouteContextService } from '@nav/route-context.service';
import { SideDrawer } from '@overlays/side-drawer/side-drawer';
import { PlannerRightPanel } from '@planner/planner-right-panel/planner-right-panel';
import { ProductsRightPanel } from '@products/products-right-panel/products-right-panel';
import { RecipesRightPanel } from '@recipes/recipes-right-panel/recipes-right-panel';
import { SidePosition } from '@uiTypes/primitive.types';

@Component({
  selector: 'app-right-panel',
  imports: [
    SideDrawer,
    ClickOutsideDirective,
    RecipesRightPanel,
    ProductsRightPanel,
    DashboardRightPanel,
    PlannerRightPanel,
  ],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.scss',
})
export class RightPanel {
  position: SidePosition = 'right';
  width = '500px';

  // =========================================================
  // Dependencies
  // =========================================================
  private routeContext = inject(RouteContextService);

  // =========================================================
  // State
  // =========================================================
  isOpen = signal(false);
  featureType = computed(() => this.routeContext.featureType());

  close() {
    this.isOpen.update(() => false);
  }
}
