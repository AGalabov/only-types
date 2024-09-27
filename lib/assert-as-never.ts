type Shape =
  | { type: 'Circle'; radius: number }
  | { type: 'Square'; side: string }
  | { type: 'Triangle'; height: boolean };
// | { type: 'Squircle'; something: boolean };

function assertAsNever(_data: never) {}

function testDiscriminator(shape: Shape) {
  switch (shape.type) {
    case 'Circle':
      return shape.radius;
    case 'Square':
      return shape.side;
    case 'Triangle':
      return shape.height;
    default:
      return assertAsNever(shape);
  }
}
