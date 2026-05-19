import { User } from '@models/user';

export type ModalType = 'login' | 'register' | 'profile';

export interface ModalConfig<T extends ModalType = ModalType> {
  type: ModalType;
  data?: ModalDataMap[T];
}

export interface ModalDataMap {
  login: {
    email?: string;
  };

  register: undefined;

  profile: {
    user: User;
  };
}
