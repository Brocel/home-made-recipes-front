import { User } from '@models/user';
import { AnyModalConfig, ConfirmIntent, ModalType } from '@uiTypes/modal.types';
import { Tone, Variant } from '@uiTypes/overlay.types';
import { ButtonVariant } from '@uiTypes/primitive.types';

export interface ConfirmData {
  variant: ButtonVariant;
  intent: ConfirmIntent;

  title: string;
  message: string;

  confirmLabel?: string;
  cancelLabel?: string;

  actionData?: any;
}

export interface ModalConfig<T extends ModalType> {
  type: T;
  data: ModalDefinitionMap[T]['data'];
  variant?: Variant;
  tone?: Tone;
}

export interface ModalStackItem {
  id: string;
  config: AnyModalConfig;
  resolver?: (result: unknown) => void;
  zIndex?: number;
  isTop?: boolean;
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
