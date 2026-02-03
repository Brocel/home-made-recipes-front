import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnumUtilsService {
  enumToList<T extends object, L extends Record<string, string>>(
    enumType: T,
    labels: L
  ) {
    return Object.keys(labels).map((key) => ({
      value: key,
      label: labels[key],
    }));
  }

  enumToShortAndLongLabels<T extends object>(
    enumType: T,
    shortLabels: Record<string, string>,
    longLabels: Record<string, string>
  ) {
    return Object.keys(shortLabels).map((key) => ({
      value: key,
      short: shortLabels[key],
      long: longLabels[key],
    }));
  }
}

  


