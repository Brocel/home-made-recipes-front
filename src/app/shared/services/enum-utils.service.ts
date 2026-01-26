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
}
