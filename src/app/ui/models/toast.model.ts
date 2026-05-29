import { ToastType } from '@uiTypes/primitive.types';

export interface Toast {
  id: string;
  type: ToastType;
  messageKey: string;
}
