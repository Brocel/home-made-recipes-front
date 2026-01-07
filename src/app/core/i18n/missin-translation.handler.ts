import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { environment } from '@env/environment';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (!environment.production) {
      // log en dev pour repérer les clés manquantes
      // remonter vers Sentry ou console selon ton setup
      console.warn('Missing translation key:', params.key, params.interpolateParams);
    }
    // retourne une clé visible dans l'UI pour repérage rapide
    return `[[${params.key}]]`;
  }
}
