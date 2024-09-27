// type Fruits = 'pear' | 'orange' | 'plum';
// type Colors = 'yellow' | 'orange' | 'blue';

// type P = `My fruit is ${Fruits} and my color is ${Colors}`;

type UrlParams<T extends string> =
  T extends `${string}{${infer Param}}${infer Rest}`
    ? Record<Param, string | number> & UrlParams<Rest>
    : {};

type ParamsToPass<T extends string> = T extends `${string}{${string}}${string}`
  ? [UrlParams<T>]
  : [];

type Params = UrlParams<'/products/{productId}/answers/{answerId}'>;

function constructUrl<T extends string>(url: T, ...params: ParamsToPass<T>) {}

constructUrl('/products'); // OK
// constructUrl('/products/{productId}', { productId: '2' }); // Error
constructUrl('/products/{productId}', { productId: '1' }); // OK

// constructUrl('/products/{productId}/answers/{answerId}', {
//   productId: '1',
// }); // Error
constructUrl('/products/{productId}/answers/{answerId}', {
  productId: '1',
  answerId: '2',
}); // OK
