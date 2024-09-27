import {
  BuildTuple,
  DivideWithRemainder,
  MinusOne,
  Zero,
} from '../lib/numbers';

type FizzBuzzBuilder<T extends number> = DivideWithRemainder<T, 3> extends [
  any,
  0
]
  ? DivideWithRemainder<T, 5> extends [any, 0]
    ? 'FizzBuzz'
    : 'Fizz'
  : DivideWithRemainder<T, 5> extends [any, 0]
  ? 'Buzz'
  : T;

type FizzBuzzHelper<
  T extends number,
  Accumulator extends any[]
> = BuildTuple<T> extends Zero
  ? Accumulator
  : FizzBuzzHelper<MinusOne<T>, [FizzBuzzBuilder<T>, ...Accumulator]>;

type FizzBuzz<T extends number> = FizzBuzzHelper<T, []>;

type Res = FizzBuzz<20>;
