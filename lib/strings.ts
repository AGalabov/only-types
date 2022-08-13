
export type Contains<T extends string, V extends string> = T extends `${string}${V}${string}` ? true : false;

// type Res1 = Contains<'testA', 'test'>; // this is of type true
// type Res2 = Contains<'Atest', 'test'>; // this is of type true
// type Res3 = Contains<'teAst', 'test'>; // this is of type false


type Replace<Value extends string, ToReplace extends string, NewValue extends string> =
  Value extends `${infer A}${ToReplace}${infer B}`
    ? `${A}${NewValue}${B}`
    : Value;

// type Res11 = Replace<'test word this', 'word', 'with'>; // this is of type `test with this
// type Res12 = Replace<'test word this', 'random', 'with'>; // this is of type `test word this`
