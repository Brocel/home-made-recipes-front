import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRouteData } from '@models/route/app-route-data.model';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteContextService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  EMPTY_ROUTE_DATA: AppRouteData = {
    feature: undefined,
    menu: [],
  };

  // =========================================================
  // Route data signal
  // =========================================================
  private routeData = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),

      map(() => this.getDeepestRoute(this.activatedRoute)),

      map((route) => route.snapshot.data as AppRouteData),
    ),
    {
      initialValue: this.EMPTY_ROUTE_DATA,
    },
  );

  // =========================================================
  // Public computed state
  // =========================================================
  feature = computed(() => this.routeData().feature);

  menu = computed(() => this.routeData().menu);

  // =========================================================
  // Helpers
  // =========================================================

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}
