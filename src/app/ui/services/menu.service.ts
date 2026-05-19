import { signal } from '@angular/core';

export class MenuService {
  readonly open = signal(false);

  openMenu(): void {
    this.open.set(true);
  }

  closeMenu(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  setOpen(value: boolean): void {
    this.open.set(value);
  }
}
