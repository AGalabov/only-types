type Head<T extends string> = T extends `${infer First}.${string}` ? First : T;

type Tail<T extends string> = T extends `${string}.${infer Rest}` ? Rest : never;

type AllowedInputs<T> = T extends object ? {
  [K in keyof Required<T>]:
    K extends string | number ?
    T[K] extends readonly unknown[]
      ? AllowedInputs<T[K][number]> extends never ? `${K}` : K | `${K}.${AllowedInputs<T[K][number]>}`
      : AllowedInputs<T[K]> extends never ? `${K}` : K  |`${K}.${AllowedInputs<T[K]>}`
    : never
}[keyof T] : never;

type DeepPickWithoutSuggestions<T, K extends string> =
  T extends object ? {
  [P in keyof T as P extends Head<K> ? P : never]:
    P extends Head<K>
      ? T[P] extends readonly unknown[]
        ? DeepPickWithoutSuggestions<T[P][number], Tail<Extract<K, `${P}.${string}`>>>[]
        : DeepPickWithoutSuggestions<T[P], Tail<Extract<K, `${P}.${string}`>>>
      : never
} : T

type DeepPick<T, K extends AllowedInputs<T>> = K extends string ? DeepPickWithoutSuggestions<T, K> : never;

type TestData = {
  asd: string,
  b?: number,
  q: {
    test: string,
    c?: number
  }
  qwe: {
    asd: string,
    b?: number,
  }[],
};

type Test = DeepPick<TestData, 'asd' | 'q' | 'qwe.asd' | 'b'>;
