import { RestFromArray } from "../lib/arrays";
import { GreaterThan, Length, PlusOne, Zero } from "../lib/numbers";

type NumberOfIncreases<
  Input extends number[],
  Previous extends number | null = null,
  Accumulator extends number = Length<Zero>
  > = Input extends []
  ? Accumulator
  : Previous extends number
  ? GreaterThan<Input[0], Previous> extends true
  ? NumberOfIncreases<RestFromArray<Input>, Input[0], PlusOne<Accumulator>>
  : NumberOfIncreases<RestFromArray<Input>, Input[0], Accumulator>
  : NumberOfIncreases<RestFromArray<Input>, Input[0], Accumulator>;

type SimpleSample = [1, 2, 4, 3, 6, 5, 7, 8, 5, 6, 8];
type LargerSample = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263, 265, 300, 19, 18, 20];

type Solution1 = NumberOfIncreases<SimpleSample>; // Solution1 is exactly of type 7
type Solution2 = NumberOfIncreases<LargerSample>; // Solution2 is exactly of type 10
