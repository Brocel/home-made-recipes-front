export type LayerType = 'base' | 'dropdown' | 'sticky' | 'drawer' | 'overlay' | 'modal' | 'toast';

export type Position = 'anchored' | 'viewport';

export type Placement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

export type OpeningStrategy = 'click' | 'hover' | 'programmatic' | 'timed';

export type Variant = 'surface' | 'primary' | 'accent' | 'danger' | 'success';

export type Tone = 'soft' | 'solid' | 'elevated' | 'glass';

export type FloatingClassModel = {
  root: boolean;
  isOpen: boolean;

  position: string;
  placement: string;

  tone: string;
  variant: string;

  layer: string;
};
