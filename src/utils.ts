export function asArray(quantity: number): null[] {
  return Array.from(Array(quantity).keys()).map(() => null);
}
