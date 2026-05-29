import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UnitComposition } from '@models/recipes/unit';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '@uiModels/form.model';

@Injectable({ providedIn: 'root' })
export class EnumUtilsService {
  private readonly translate = inject(TranslateService);

  /**
   * Convert enum labels to translated SelectOption array.
   * Automatically re-translates when language changes.
   *
   * @param labels Enum labels map (e.g., IngredientType enum values)
   * @returns Signal<SelectOption[]> - Updates on language change
   *
   * @example
   * const ingredientOptions = this.enumUtils.mapEnumLabelsToSelectOption(
   *   { MEAT: 'glossary.ingredientType.meat', VEGETABLE: 'glossary.ingredientType.vegetable' }
   * );
   *
   * // In template:
   * [options]="ingredientOptions()"
   */
  mapEnumLabelsToSelectOption(labels: Record<string, string>): Signal<SelectOption[]> {
    // Convert language change event to signal for reactivity
    // Automatically manages subscription lifecycle
    const currentLanguage = toSignal(this.translate.onLangChange, {
      initialValue: null,
    });

    // Computed signal: recomputes when language signal changes
    // No manual subscriptions needed - auto-cleanup when signal destroyed
    return computed(() => {
      currentLanguage(); // Track dependency on language changes

      return Object.keys(labels).map((key) => ({
        value: key,
        label: this.translate.instant(labels[key]),
      }));
    });
  }

  /**
   * Convert unit labels to translated UnitComposition array.
   * Automatically re-translates when language changes.
   * Handles both short and long labels for units.
   *
   * @param shortLabels Unit short labels (e.g., Unit enum values)
   * @param longLabels Unit long labels (e.g., Unit enum values)
   * @returns Signal<UnitComposition[]> - Updates on language change
   *
   * @example
   * const unitOptions = this.enumUtils.mapUnit(
   *   { KG: 'kg', LITER: 'L' },
   *   { KG: 'Kilogram', LITER: 'Liter' }
   * );
   *
   * // In template:
   * [options]="unitOptions()"
   */
  mapUnit(
    shortLabels: Record<string, string>,
    longLabels: Record<string, string>,
  ): Signal<UnitComposition[]> {
    // Convert language change event to signal for reactivity
    // Automatically manages subscription lifecycle
    const currentLanguage = toSignal(this.translate.onLangChange, {
      initialValue: null,
    });

    // Computed signal: recomputes when language signal changes
    // No manual subscriptions needed - auto-cleanup when signal destroyed
    return computed(() => {
      currentLanguage(); // Track dependency on language changes

      return Object.keys(shortLabels).map((key) => ({
        value: key,
        short: this.translate.instant(shortLabels[key]),
        long: this.translate.instant(longLabels[key]),
      }));
    });
  }
}
