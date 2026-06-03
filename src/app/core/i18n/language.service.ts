import { computed, effect, Injectable, signal } from '@angular/core';
import { ApiError } from '@errors/api-error.type';
import { positionalArgsToNamedParams } from '@errors/error.utils';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const STORAGE_KEY = 'app_lang';
const SUPPORTED_LANGS = ['fr', 'pt-BR'];

type SupportedLang = (typeof SUPPORTED_LANGS)[number];
type TranslationTree = Record<string, unknown>;
type TranslationCache = Partial<Record<SupportedLang, TranslationTree>>;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  // =========================================================
  // Reactive language state
  // =========================================================
  private currentLangSignal = signal<SupportedLang>('fr');
  current = computed(() => this.currentLangSignal());

  private readonly translations = signal<TranslationCache>({});

  // =========================================================
  // Message system
  // =========================================================
  private msgKey = signal<string | null>(null);
  private msgParams = signal<Record<string, any> | null>(null);
  private msg = signal<string | null>(null);

  constructor(private translate: TranslateService) {
    this.translate.addLangs([...SUPPORTED_LANGS]);
    this.translate.setFallbackLang('fr');

    const saved = localStorage.getItem(STORAGE_KEY);
    const browser = this.detectBrowserLang();

    const initialLang = (saved ?? browser ?? 'fr') as SupportedLang;

    this.translate.setFallbackLang('fr').subscribe((translations) => {
      this.translations.update((current) => ({
        ...current,
        fr: translations ?? {},
      }));
    });

    this.use(initialLang);

    // =========================================================
    // Reactive translated messages
    // =========================================================
    effect((onCleanup) => {
      const key = this.msgKey();
      const params = this.msgParams() ?? undefined;

      if (!key) {
        this.msg.set(null);
        return;
      }

      // Subscribe translation stream
      const sub: Subscription = this.translate.stream(key, params).subscribe({
        next: (text: string) => this.msg.set(text),
        error: () => this.msg.set(null),
      });

      // Cleanup
      onCleanup(() => sub.unsubscribe());
    });
  }

  // =========================================================
  // Public API
  // =========================================================
  use(lang: string): void {
    const normalized: SupportedLang = SUPPORTED_LANGS.includes(lang as SupportedLang)
      ? (lang as SupportedLang)
      : 'fr';

    this.translate.use(normalized).subscribe((translations) => {
      this.translations.update((current) => ({
        ...current,
        [normalized]: translations ?? {},
      }));
    });

    this.currentLangSignal.set(normalized);

    localStorage.setItem(STORAGE_KEY, normalized);

    this.setHtmlLangAttr(normalized);
  }

  instant(key: string | string[], params?: any) {
    return this.translate.instant(key, params);
  }

  exists(key: string): boolean {
    const translations = this.translations();
    const currentLang = this.currentLangSignal();

    return (
      this.hasTranslationKey(translations[currentLang], key) ||
      (currentLang !== 'fr' && this.hasTranslationKey(translations['fr'], key))
    );
  }

  /**
   * Translates an API error payload into a user-friendly message.
   * Uses the errorKey to find a translation, falling back to the backend message or a generic text if needed.
   *
   * @param apiError The error payload from the backend.
   */
  translateApiError(apiError: ApiError): string {
    if (!apiError) return 'An error occurred';

    const { errorKey, message, messageArgs } = apiError;
    const params = positionalArgsToNamedParams(messageArgs);

    if (errorKey && this.exists(errorKey)) {
      return this.translate.instant(errorKey, { defaultValue: message, ...params });
    }

    if (message) return message;

    return 'An error occurred';
  }

  // =========================================================
  // Message helpers
  // =========================================================
  setMsg(key: string, params?: Record<string, any>) {
    this.msgKey.set(key);
    this.msgParams.set(params ?? null);
  }

  clearMsg() {
    this.msgKey.set(null);
    this.msgParams.set(null);
    this.msg.set(null);
  }

  getMessageSignal() {
    return this.msg;
  }

  getKey() {
    return this.msgKey();
  }

  // =========================================================
  // Internal helpers
  // =========================================================
  private detectBrowserLang(): SupportedLang | null {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language;

    if (!browserLang) return null;

    if (browserLang.startsWith('pt')) return 'pt-BR';

    if (browserLang.startsWith('fr')) return 'fr';

    return null;
  }

  private hasTranslationKey(translations: TranslationTree | undefined, key: string): boolean {
    if (!translations) return false;

    const resolved = key.split('.').reduce<unknown>((current, segment) => {
      if (!current || typeof current !== 'object') return undefined;

      return (current as Record<string, unknown>)[segment];
    }, translations);

    return typeof resolved !== 'undefined';
  }

  private setHtmlLangAttr(lang: string) {
    try {
      document.documentElement.lang = lang;
    } catch {}
  }
}
