import { curry, head, identity } from 'lodash';
import { flow } from './flow';

describe('flow()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should supply each function with the return value of the previous', () => {
    const increment = (x: number) => x + 1;
    const square = (x: number) => x * x;
    const fixed = (n: number) => n.toFixed(1);

    expect(flow(increment, square, fixed)(2)).toBe('9.0');
  });

  it('should return an identity function when no arguments are given', () => {
    expect(flow()('a')).toBe('a');
  });

  it('should work with a curried function and `_.head`', () => {
    const curried: any = curry(identity);
    const combined: any = flow(head as any, curried);
    expect(combined([1])).toBe(1);
  });
});
