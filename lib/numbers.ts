export type Tuple = any[];
export type Zero = [];

export type Length<T extends Tuple> = T extends { length: infer L }
  ? L extends number
    ? L
    : Length<Zero>
  : Length<Zero>;

export type BuildTuple<N extends number, T extends Tuple = Zero> = T extends {
  length: N;
}
  ? T
  : BuildTuple<N, [any, ...T]>;

// TS has it's limitation when it comes to recursive depth:
// type UnderLimit = BuildTuple<999>;
// type AboveLimit = BuildTuple<1000>;

// Arithmetics
export type PlusOne<A extends number> = Length<[...BuildTuple<A>, any]>;
// type Twenty = PlusOne<19>;

export type Plus<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;
// type Six = Plus<4, 2>;

export type MinusOne<N extends number, T = BuildTuple<N>> = T extends Zero
  ? Length<Zero>
  : T extends [unknown, ...infer Rest]
  ? Length<Rest>
  : Length<Zero>;
// type Thirteen = MinusOne<14>;

export type Minus<
  A extends number,
  B extends number,
  T = BuildTuple<A>
> = T extends Zero
  ? Length<Zero>
  : T extends [...infer Rest, ...BuildTuple<B>]
  ? Length<Rest>
  : Length<Zero>;
// type Four = Minus<6, 2>;

export type Multiply<
  A extends number,
  B extends number,
  Accumulated extends number = Length<Zero>
> = B extends Length<Zero>
  ? Accumulated
  : Multiply<A, MinusOne<B>, Plus<Accumulated, A>>;

// type ZeroMultiplied = Multiply<0, 5>;
// type MultipliedByZero = Multiply<5, 0>;
// type Twenty = Multiply<5, 4>;
// type TwentyFive = Multiply<5, 5>;

export type GreaterThan<
  A extends number,
  B extends number
> = BuildTuple<B> extends Zero
  ? BuildTuple<A> extends Zero
    ? false
    : true
  : GreaterThan<MinusOne<A>, MinusOne<B>>;

// type Greater = GreaterThan<5, 3>; // Greater is of export type true
// type Equal = GreaterThan<5, 5>; // Equal is of export type false
// type Smaller = GreaterThan<3, 5>; // Smaller is of export type false

export type Divide<
  A extends number,
  B extends number,
  Accumulated extends number = Length<Zero>
> = GreaterThan<A, B> extends true
  ? Divide<Minus<A, B>, B, PlusOne<Accumulated>>
  : A extends B
  ? PlusOne<Accumulated>
  : Accumulated;

export type DivideWithRemainder<
  A extends number,
  B extends number,
  Accumulated extends number = Length<Zero>
> = GreaterThan<A, B> extends true
  ? DivideWithRemainder<Minus<A, B>, B, PlusOne<Accumulated>>
  : A extends B
  ? [PlusOne<Accumulated>, 0]
  : [Accumulated, A];

// type Divided = Divide<13, 3>;
// type DivWithRem = DivideWithRemainder<13, 3>;
