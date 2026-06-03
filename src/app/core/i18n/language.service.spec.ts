import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LanguageService } from './language.service';

const translations = {
  fr: {
    feature: {
      home: {
        title: 'Home Made Recipes',
      },
    },
    messages: {
      error: {
        recipeFetchingDaily: 'Impossible de charger la recette du jour',
      },
    },
  },
  'pt-BR': {
    feature: {
      home: {
        title: 'Home Made Recipes',
      },
    },
    messages: {
      error: {
        recipeFetchingDaily: 'Impossível carregar a receita do dia',
      },
    },
  },
} as const;

function resolveTranslation(key: string, dictionary: unknown): string | undefined {
  return key.split('.').reduce<unknown>(
    (current, segment) => {
      if (!current || typeof current !== 'object') return undefined;

      return (current as Record<string, unknown>)[segment];
    },
    dictionary as Record<string, unknown>,
  ) as string | undefined;
}

describe('LanguageService', () => {
  let service: LanguageService;
  let currentLang: keyof typeof translations;

  const translateServiceMock = {
    addLangs: jasmine.createSpy('addLangs'),
    setFallbackLang: jasmine.createSpy('setFallbackLang'),
    use: jasmine.createSpy('use').and.callFake((lang: string) => {
      currentLang = (lang in translations ? lang : 'fr') as keyof typeof translations;
      return of(translations[currentLang]);
    }),
    instant: jasmine
      .createSpy('instant')
      .and.callFake((key: string, options?: { defaultValue?: string }) => {
        return resolveTranslation(key, translations[currentLang]) ?? options?.defaultValue ?? key;
      }),
    stream: jasmine
      .createSpy('stream')
      .and.callFake((key: string) => of(resolveTranslation(key, translations[currentLang]) ?? key)),
    getTranslation: jasmine.createSpy('getTranslation').and.callFake((lang: string) => {
      const normalized = (lang in translations ? lang : 'fr') as keyof typeof translations;
      return of(translations[normalized]);
    }),
  };

  beforeEach(async () => {
    localStorage.setItem('app_lang', 'fr');

    await TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceMock }],
    }).compileComponents();

    currentLang = 'fr';
    service = TestBed.inject(LanguageService);
  });

  it('should detect translation keys that exist in the loaded JSON files', () => {
    expect(service.exists('feature.home.title')).toBeTrue();
    expect(service.exists('feature.home.missing')).toBeFalse();
  });

  it('should translate api errors when the key exists', () => {
    expect(
      service.translateApiError({
        timestamp: '2026-06-03T00:00:00.000Z',
        status: 400,
        error: 'Bad Request',
        errorKey: 'messages.error.recipeFetchingDaily',
        message: 'Fallback message',
        path: '/recipes',
      }),
    ).toBe('Impossible de charger la recette du jour');
  });

  it('should fall back to the backend message when the translation key is missing', () => {
    expect(
      service.translateApiError({
        timestamp: '2026-06-03T00:00:00.000Z',
        status: 400,
        error: 'Bad Request',
        errorKey: 'messages.error.unknown',
        message: 'Fallback message',
        path: '/recipes',
      }),
    ).toBe('Fallback message');
  });
});
