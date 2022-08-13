
export type RestFromArray<T extends any[]> = T extends [any, ...infer Rest]
  ? Rest
  : [];
// type Rest = RestFromArray<[string, number, { test: boolean }]>;
// type Rest2 = RestFromArray<[1, 2, 3]>;
