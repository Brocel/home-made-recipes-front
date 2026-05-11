import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('LocalStorage set error:', err);
    }
  }

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (err) {
      console.warn('LocalStorage get error:', err);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn('LocalStorage remove error:', err);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.warn('LocalStorage clear error:', err);
    }
  }
}
