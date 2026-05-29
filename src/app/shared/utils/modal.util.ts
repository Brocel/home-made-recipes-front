import { User } from '@models/user';
import { ConfirmConfigOptions, ModalConfig } from '@uiModels/modal.model';

export function buildLoginConfig(email?: string): ModalConfig<'login'> {
  return {
    type: 'login',
    data: { email: email },
  };
}

export function buildRegisterConfig(): ModalConfig<'register'> {
  return {
    type: 'register',
    data: undefined,
  };
}

export function buildProfileConfig(user: User): ModalConfig<'profile'> {
  return {
    type: 'profile',
    data: { user },
  };
}

export function buildConfirmConfig(options: ConfirmConfigOptions): ModalConfig<'confirm'> {
  return {
    type: 'confirm',
    data: {
      intent: options.intent,
      variant: options.variant,
      title: options.title,
      message: options.message,
      confirmLabel: options.confirmLabel,
      cancelLabel: options.cancelLabel,
      actionData: options.actionData,
    },
  };
}

/**
 * Build a modal config for adding a new product.
 * @param initialName Optional pre-filled product name
 */
export function buildAddProductConfig(initialName?: string): ModalConfig<'add-product'> {
  return {
    type: 'add-product',
    data: { initialName },
  };
}

export function buildConfirmResult(cancelled: boolean, actionData?: any) {
  return {
    cancelled: cancelled,
    actionData,
  };
}

export function generateId(): string {
  return crypto.randomUUID();
}
