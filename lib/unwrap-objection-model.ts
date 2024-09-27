import { Model } from 'objection';

class BaseModel extends Model {
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class MessageModel extends BaseModel {
  static readonly tableName = 'messages';

  value!: string;
  type!: 'user' | 'assistant' | 'system';
}

export type UnwrapModelDataFromBase<
  M extends typeof Model,
  Base extends typeof Model = typeof Model
> = Omit<M['prototype'], keyof Base['prototype']>;

export type UnwrapModelData<T extends typeof Model> =
  UnwrapModelDataFromBase<T>;

export type UnwrapModelInsertData<T extends typeof BaseModel> =
  UnwrapModelDataFromBase<T, typeof BaseModel>;

type Message = UnwrapModelInsertData<typeof MessageModel>;

function insertMessage(m: Message) {
  MessageModel.query().insert(m);
}

// insertMessage({ });
