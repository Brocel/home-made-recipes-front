import { ModalConfig } from '@uiTypes/modal.types';

export function buildLoginConfig(email?: string): ModalConfig<'login'> {
  return {
    type: 'login',
    data: { email: email },
  };
}

export function buildRegisterConfig(): ModalConfig<'register'> {
  return {
    type: 'register',
  };
}
