import { effect, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteContextService } from '@nav/route-context.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private title = inject(Title);
  private translate = inject(TranslateService);
  private context = inject(RouteContextService);

  init(): void {
    effect(() => {
      const feature = this.context.feature();

      if (!feature?.title) {
        this.title.setTitle('Home Made Recipe');

        return;
      }

      this.translate.stream(feature.title).subscribe((translated) => {
        this.title.setTitle(translated);
      });
    });
  }
}
