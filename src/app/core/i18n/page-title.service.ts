import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FeatureData } from '@models/features/feature-data.model';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  // =========================================================
  // Dependencies
  // =========================================================

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  private title = inject(Title);

  private translate = inject(TranslateService);

  // =========================================================
  // Public API
  // =========================================================

  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),

        map(() => this.getDeepestRoute(this.activatedRoute)),

        map((route) => route.snapshot.data['feature'] as FeatureData | undefined),
      )
      .subscribe((feature) => {
        this.updateTitle(feature);
      });
  }

  // =========================================================
  // Helpers
  // =========================================================

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }

  private updateTitle(feature?: FeatureData): void {
    if (!feature?.title) {
      this.title.setTitle('My Recipe App');

      return;
    }

    this.translate.stream(feature.title).subscribe((translated) => {
      this.title.setTitle(translated);
    });
  }
}
