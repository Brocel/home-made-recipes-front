// Composant bouton réutilisable, standalone.
// - Variantes : primary | outline | ghost | danger
// - Supporte : disabled, loading, type (button|submit|reset)
// - Émet : pressed (Event) au clic (sauf si disabled ou loading)
// - Accessible : aria-disabled, aria-busy, focus visible

import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class Button {
  /**
   * variant : style visuel du bouton
   * - primary : action principale
   * - outline : bouton secondaire encadré
   * - ghost : lien discret
   * - danger : action destructive
   */
  @Input() variant: 'primary' | 'outline' | 'ghost' | 'danger' = 'primary';

  /** disabled : désactive le bouton côté UI */
  @Input() disabled = false;

  /** loading : état d'envoi / attente ; empêche les clics et affiche un indicateur */
  @Input() loading = false;

  /** type HTML du bouton */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** small : variante compacte */
  @Input() small = false;

  /** fullWidth : étire le bouton sur toute la largeur du conteneur */
  @Input() fullWidth = false;

  /** Événement émis quand le bouton est activé */
  @Output() pressed = new EventEmitter<Event>();

  /** Ajoute une classe CSS utile pour le style via HostBinding */
  @HostBinding('class.full-width') get isFullWidth() { return this.fullWidth; }

  /**
   * onClick
   * - Empêche l'action si disabled ou loading
   * - Émet pressed sinon
   */
  onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.pressed.emit(e);
  }
}
