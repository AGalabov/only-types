export type Contains<
  T extends string,
  V extends string
> = T extends `${string}${V}${string}` ? true : false;

// type Res1 = Contains<'testA', 'test'>; // this is of type true
// type Res2 = Contains<'Atest', 'test'>; // this is of type true
// type Res3 = Contains<'teAst', 'test'>; // this is of type false

type Replace<
  Value extends string,
  ToReplace extends string,
  NewValue extends string
> = Value extends `${infer A}${ToReplace}${infer B}`
  ? `${A}${NewValue}${B}`
  : Value;

// type Res11 = Replace<'test word this', 'word', 'with'>; // this is of type `test with this
// type Res12 = Replace<'test word this', 'random', 'with'>; // this is of type `test word this`

type Split<Separator extends string, Str extends string> = string extends Str
  ? [string, ...string[]]
  : Str extends ""
  ? Separator extends Str
    ? []
    : [""]
  : Str extends `${infer Head}${Separator}${infer Tail}`
  ? [Head, ...Split<Separator, Tail>]
  : [Str];

// type Res1 = Split<"", "">; // expected []
// type Res2 = Split<"", "a">; // expected ['a']
// type Res3 = Split<"a", "">; // expected ['']
// type Res4 = Split<"a", "a">; // expected ['','']
// type Res5 = Split<"a", "asdaqwea">; // expected ['', 'sd', 'qwe', '']
// type Res6 = Split<"whatever", string>; // expected [string, ...string[]]
// type Res7 = Split<"a", "zxc">; // expected ['zxc']
