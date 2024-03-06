import { Model } from 'objection';

class BaseModel extends Model {
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export type UnwrapModelDataFromBase<
  M extends typeof Model,
  Base extends typeof Model = typeof Model
> = Omit<M['prototype'], keyof Base['prototype']>;

export type UnwrapModelData<T extends typeof Model> =
  UnwrapModelDataFromBase<T>;

export type UnwrapModelInsertData<T extends typeof BaseModel> =
  UnwrapModelDataFromBase<T, typeof BaseModel>;
