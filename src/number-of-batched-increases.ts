import { RestFromArray } from "../lib/arrays";
import { Length, Zero, GreaterThan, PlusOne } from "../lib/numbers";

export type NumberOfBatchedIncreases<
  Input extends number[],
  Accumulator extends number = Length<Zero>
  > = Input extends { length: infer L }
  ? L extends number
  ? GreaterThan<L, 3> extends true
  ? GreaterThan<Input[2], Input[0]> extends true
  ? NumberOfBatchedIncreases<RestFromArray<Input>, PlusOne<Accumulator>>
  : NumberOfBatchedIncreases<RestFromArray<Input>, Accumulator>
  : Accumulator
  : Accumulator
  : Accumulator;

type SimpleSample = [1, 2, 4, 3, 6, 5, 7, 8, 5, 6, 8];
type LargerSample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263, 265, 300, 19, 18, 20, 21];


type Solution1 = NumberOfBatchedIncreases<SimpleSample>; // Solution is of type  6
type Solution2 = NumberOfBatchedIncreases<LargerSample>; // Solution2 is of type 8
