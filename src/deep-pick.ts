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
  T extends object ? Head<K> extends never
    ? { [P in keyof T]: T[P] }
    : {
      [P in keyof T as P extends Head<K> ? P : never]:
        P extends Head<K>
          ? T[P] extends readonly unknown[]
            ? DeepPickWithoutSuggestions<T[P][number], Tail<Extract<K, `${P}.${string}`>>>[]
            : DeepPickWithoutSuggestions<T[P], Tail<Extract<K, `${P}.${string}`>>>
          : T[P]
    }
  : T


type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => any) ? I : never

type DeepPick<T, K extends AllowedInputs<T>> = UnionToIntersection<K extends infer Keys ? Keys extends string ? DeepPickWithoutSuggestions<T, Keys> : never : never>;

type User = {
  name: string,
  age?: number,
  address: {
    street: string,
    zipCode?: number
  }
  posts: {
    title: string,
    likes?: number,
  }[],
};

// Important: This is a single object (no unions) and it supports specific
// paths ONLY - just like the regular Pick
type UserSubset = DeepPick<User, 'address' | 'name' | 'posts.likes'>;
