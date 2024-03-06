import type { Model } from 'objection';

export type UnwrapModelData<T extends typeof Model> = Omit<
  T['prototype'],
  keyof typeof Model['prototype']
>;
