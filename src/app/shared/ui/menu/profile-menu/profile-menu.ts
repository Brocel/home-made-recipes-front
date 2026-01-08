// src/app/ui/profile-menu/profile-menu.component.ts
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-menu.html',
  styleUrls: ['./profile-menu.scss']
})
export class ProfileMenu implements AfterViewInit {
  @Input() user: any | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() goToProfile = new EventEmitter<void>();
  @Output() goToSettings = new EventEmitter<void>();

  @ViewChild('menu') menuEl!: ElementRef<HTMLElement>;
  private firstFocusable?: HTMLElement;

  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // focus the first focusable element in the menu for accessibility
    const el = this.menuEl?.nativeElement;
    if (!el) return;
    this.firstFocusable = el.querySelector<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])') ?? undefined;
    this.firstFocusable?.focus();
  }

  onClose(): void {
    this.close.emit();
  }

  onLogout(): void {
    this.logout.emit();
    this.onClose();
  }

  onProfile(): void {
    this.goToProfile.emit();
    this.onClose();
  }

  onSettings(): void {
    this.goToSettings.emit();
    this.onClose();
  }

  // called by parent if needed to trap focus or close on outside click
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
      event.stopPropagation();
    }
  }
}
