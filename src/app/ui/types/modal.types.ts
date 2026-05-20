import { User } from '@models/user';
import { Tone, Variant } from './overlay.types';

export type ConfirmType = 'delete' | 'update' | 'create' | 'success' | 'error';

export type ModalType = 'login' | 'register' | 'profile' | 'confirm';

export interface ConfirmData {
  type: ConfirmType;

  title: string;
  message: string;

  confirmLabel?: string;
  cancelLabel?: string;
}

export interface ModalConfig<T extends ModalType = ModalType> {
  type: ModalType;
  data?: ModalDataMap[T];
  variant?: Variant;
  tone?: Tone;
}

export interface ModalDataMap {
  login: {
    email?: string;
  };

  register: undefined;

  profile: {
    user: User;
  };

  confirm: ConfirmData;
}
