interface BaseObject {
  a: number;
  b?: string;
  c?: boolean;
  d: object;
}

type RequiredBase = Required<BaseObject>;

export type WithOptionalProperties<Type, Keys extends keyof Type> = Omit<Type, Keys> & {
  [Property in Keys]?: Type[Property];
};

type OptionalAinBase = WithOptionalProperties<BaseObject, 'a'>;
// type A = OptionalAinBase['']

export type WithRequiredProperties<Type, Keys extends keyof Type> = Type & {
  [Property in Keys]-?: Type[Property];
};

type RequiredCinBase = WithRequiredProperties<BaseObject, 'b'>;

// type B = RequiredCinBase['']
