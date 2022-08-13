import { Length, PlusOne, Zero } from "../lib/numbers";

export type NumberOfOccurrences<
  Value extends string,
  Lookup extends string,
  Accumulator extends number = Length<Zero>
  > =
  Value extends `${string}${Lookup}${infer Rest}`
  ? NumberOfOccurrences<Rest, Lookup, PlusOne<Accumulator>>
  : Accumulator;

type Result = NumberOfOccurrences<'a word that is a new test for a result', 'a'>; // result is 4
