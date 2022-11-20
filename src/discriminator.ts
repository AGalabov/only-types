type Discriminator<
  T extends object,
  K extends keyof T,
  V extends T[K]
> = Extract<T, { [key in K]: V }>;

type Union =
  | { key: "a"; a: number }
  | { key: "b"; b: string }
  | { key: "c"; c: boolean };

type Result1 = Discriminator<Union, "key", "a">; // Result1 = { key: "a", a: number }
type Result2 = Discriminator<Union, "key", "b">; // Result1 = { key: "b"; b: string }
type Result3 = Discriminator<Union, "key", "c">; // Result1 = { key: "c"; c: boolean }
