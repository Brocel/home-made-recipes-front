import { effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

const STORAGE_KEY = 'app_lang';
const SUPPORTED_LANGS = ['fr', 'pt-BR'];

@Injectable({providedIn: 'root'})
export class LanguageService {

  private msgKey = signal<string | null>(null);
  private msgParams = signal<Record<string, any> | null>(null);
  private msg = signal<string | null>(null);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(SUPPORTED_LANGS);
    this.translate.setFallbackLang('fr');

    const saved = localStorage.getItem(STORAGE_KEY);
    const browser = this.detectBrowserLang();
    const toUse = saved ?? browser ?? 'fr';
    this.use(toUse);

    // effect to handle messages translation
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
        error: () => this.msg.set(null)
      });

      // Cleanup
      onCleanup(() => sub.unsubscribe())
    });
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
    try {
      document.documentElement.lang = lang;
    } catch {
    }
  }

  // Message handling
  setMsg(key: string, params?: Record<string, any>) {
    this.msgParams.set(params ?? null);
    this.msgKey.set(key);
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

}
