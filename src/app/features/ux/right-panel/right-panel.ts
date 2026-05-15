import { Component, computed, inject, signal } from '@angular/core';
import { SidePosition } from '@appTypes/style.type';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { RouteContextService } from '@nav/route-context.service';
import { ProductsRightPanel } from '@products/products-right-panel/products-right-panel';
import { RecipesRightPanel } from '@recipes/recipes-right-panel/recipes-right-panel';
import { SideDrawer } from '@ui/layout/side-drawer/side-drawer';
import { PlannerRightPanel } from '../../planner/planner-right-panel/planner-right-panel';
import { ProfileRightPanel } from '../../profile/profile-right-panel/profile-right-panel';

@Component({
  selector: 'app-right-panel',
  imports: [
    SideDrawer,
    ClickOutsideDirective,
    RecipesRightPanel,
    ProductsRightPanel,
    ProfileRightPanel,
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
