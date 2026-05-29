import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { ToastContainer } from '@overlays/toast-container/toast-container';
import { PageTitleService } from '@translation/page-title.service';
import { Footer } from '@ux/footer/footer';
import { LeftPanel } from '@ux/left-panel/left-panel';
import { ModalHost } from '@ux/modal-host/modal-host';
import { Navbar } from '@ux/navbar/navbar';
import { RightPanel } from '@ux/right-panel/right-panel';
import { PageLayout } from './ui/layouts/page-layout/page-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    RouterOutlet,
    Footer,
    LeftPanel,
    PageLayout,
    RightPanel,
    ModalHost,
    ToastContainer,
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  // =========================================================
  // Dependencies
  // =========================================================
  private authService = inject(AuthService);
  private pageTitle = inject(PageTitleService);

  ngOnInit(): void {
    this.authService.loadAuthFromStorage();
  }

  constructor() {
    this.pageTitle.init();
  }
}
