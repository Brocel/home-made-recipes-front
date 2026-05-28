import { computed, effect, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouteContextService } from '@nav/route-context.service';
import { TranslateService } from '@ngx-translate/core';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private title = inject(Title);
  private translate = inject(TranslateService);
  private context = inject(RouteContextService);

  private readonly featureTitleKey = computed(() => this.context.feature()?.title ?? null);
  private readonly translatedTitle = toSignal(
    toObservable(this.featureTitleKey).pipe(
      switchMap((key) => (key ? this.translate.stream(key) : of('Home Made Recipe'))),
    ),
    { initialValue: 'Home Made Recipe' },
  );

  init(): void {
    effect(() => {
      this.title.setTitle(this.translatedTitle());
    });
  }
}
