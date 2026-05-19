import { User } from '@models/user';
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

export function buildProfileConfig(user: User): ModalConfig<'profile'> {
  return {
    type: 'profile',
    data: { user },
  };
}
