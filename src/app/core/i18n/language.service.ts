import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'app_lang';
const SUPPORTED_LANGS = ['fr', 'pt-BR'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(SUPPORTED_LANGS);
    this.translate.setFallbackLang('fr');

    const saved = localStorage.getItem(STORAGE_KEY);
    const browser = this.detectBrowserLang();
    const toUse = saved ?? browser ?? 'fr';
    this.use(toUse);
  }

  use(lang: string) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'fr';
    this.translate.use(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    this.setHtmlLangAttr(lang);
  }

  current(): string | null {
    return this.translate.getCurrentLang() || this.translate.getFallbackLang();
  }

  instant(key: string | string[], params?: any) {
    return this.translate.instant(key, params);
  }

  private detectBrowserLang(): string | null {
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (!nav) return null;
    if (nav.startsWith('pt')) return 'pt-BR';
    if (nav.startsWith('fr')) return 'fr';
    return null;
  }

  private setHtmlLangAttr(lang: string) {
    try { document.documentElement.lang = lang; } catch {}
  }
}
