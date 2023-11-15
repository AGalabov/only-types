# No functions only types

Solving the puzzles using variables, loops and functions is cool and all. But have you tried using types only?

## My personal knowledge base of TS keywords for mapped types:

- `keyof`: Used to fetch a union of keys from a given type. Useful in mapped types to operate on each property of a type.

- `extends`: Used in conditional types to check if a type is a subtype of another. It's essentially an if condition for types.

- `infer`: Used within conditional types to infer a type within a conditional branch. This inferred type can then be used in further branches of the conditional type.

- `in`: Used in mapped types to iterate over all keys of an object type.

- `as`: Used in key remapping in mapped types. It allows you to take an existing key and map it to a new key in the resulting type.

- `typeof`: Used to derive the type of a given expression.
