import { ModalConfig, ModalDefinitionMap } from '@uiModels/modal.model';

export type ConfirmIntent = 'delete' | 'update' | 'create' | 'default';

export type ModalType = Extract<keyof ModalDefinitionMap, string>;

export type ModalResult<T extends ModalType> = ModalDefinitionMap[T]['result'];

export type AnyModalConfig = {
  [K in ModalType]: ModalConfig<K>;
}[ModalType];

export type AnyModalResult = {
  [K in ModalType]: ModalResult<K>;
}[ModalType];
