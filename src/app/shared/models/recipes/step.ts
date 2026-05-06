export interface Step {
  id: number;
  description: string;
  order: number;
}

export type StepDTO = Omit<Step, 'id'>;
