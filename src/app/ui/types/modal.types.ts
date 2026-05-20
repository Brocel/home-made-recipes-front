import { User } from '@models/user';
import { Tone, Variant } from './overlay.types';
import { ButtonVariant } from './primitive.types';

export type ConfirmIntent = 'delete' | 'update' | 'create' | 'default';

export type ModalType = keyof ModalDefinitionMap;

export interface ConfirmData {
  variant: ButtonVariant;
  intent: ConfirmIntent;

  title: string;
  message: string;

  confirmLabel?: string;
  cancelLabel?: string;

  actionData?: any;
}

export type ModalResult<T extends ModalType> = ModalDefinitionMap[T]['result'];

export type AnyModalConfig = {
  [K in ModalType]: ModalConfig<K>;
}[ModalType];

export interface ModalConfig<T extends ModalType = ModalType> {
  type: T;
  data: ModalDefinitionMap[T]['data'];
  variant?: Variant;
  tone?: Tone;
}

export interface ModalStackItem {
  id: string;
  config: AnyModalConfig;
  resolver?: (result: unknown) => void;
  zIndex: number;
  isTop: boolean;
}

export interface ModalDefinitionMap {
  login: {
    data: {
      email?: string;
    };
    result: void;
  };

  register: {
    data: undefined;
    result: {
      registered: boolean;
      email?: string;
    };
  };

  profile: {
    data: {
      user: User;
    };
    result: void;
  };

  confirm: {
    data: ConfirmData;
    result: { confirmed: boolean; actionData?: any };
  };
}
