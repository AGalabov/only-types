export type ObjectAsArrayWithKeysForId<T> = {
  [K in keyof T]: { id: K; props: T[K] };
}[keyof T][];

type Test = {
  a: { b: string; c: boolean };
  b: { q: string };
  d: { x: number };
};

/**
 * Results in the following type:
 * type Result = (
 *   | { id: 'a'; props: { b: string; c: boolean } }
 *   | { id: 'b'; props: { q: string } }
 *   | { id: 'd'; props: { x: number } }
 * )[];
 */
type Result = ObjectAsArrayWithKeysForId<Test>;
