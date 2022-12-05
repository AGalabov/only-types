type Test = {
  a: boolean;
  b: {
    c: {
      d: boolean;
    };
    e: {
      f: boolean;
      g: boolean;
    };
  };
  h: string;
  qwe: number;
};

type NestedKeys<T> = T extends object
  ? keyof T | NestedKeys<T[keyof T]>
  : never;

type NestedPickHelper<T, Keys extends string[]> = Keys extends [
  infer FirstKey,
  ...infer RestKeys
]
  ? {
      [key in keyof T as key extends FirstKey
        ? key
        : FirstKey extends NestedKeys<T[key]>
        ? key
        : never]: key extends FirstKey
        ? T[key]
        : NestedPickHelper<T[key], Keys>;
    } & (RestKeys extends string[] ? NestedPickHelper<T, RestKeys> : never)
  : {};

type NestedPick<T, V extends NestedKeys<T>[]> = V extends string[]
  ? NestedPickHelper<T, V>
  : never;

// TODO: Can implement it with paths as well. So instead of d -> b.c.d should be used
type Res = NestedPick<Test, ["a", "d", "h"]>;
