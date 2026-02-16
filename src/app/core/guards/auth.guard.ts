import { CanActivateFn } from "@angular/router";
import { isAuthenticated } from "../state/auth.state";
import { inject } from "@angular/core";
import { ModalService } from "@app/shared/services/modal.service";

export const authGuard: CanActivateFn = () => {
    if (!isAuthenticated()) {
        inject(ModalService).open('login');
    }
  return isAuthenticated();
};
