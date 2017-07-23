import {forEachRight} from './for-each-right';

describe('forEachRight', () => {
  it('works on arrays', () => {
    let args: Array<[number, number]> = [];
    forEachRight([1, 2, 3], recordArgs);
    expect(args).toEqual([[3, 2], [2, 1], [1, 0]]);

    args = [];
    forEachRight([], recordArgs);
    expect(args).toEqual([]);

    function recordArgs(value: number, index: number) {
      args.push([value, index]);
    }
  });

  it('works on objects', () => {
    let args: Array<[number, string]> = [];
    forEachRight({a: 1, b: 2, c: 3}, recordArgs);
    expect(args).toEqual([[3, 'c'], [2, 'b'], [1, 'a']]);

    args = [];
    forEachRight({}, recordArgs);
    expect(args).toEqual([]);

    function recordArgs(value: number, key: string) {
      args.push([value, key]);
    }
  });

  it('works on undefined', () => {
    let iterations = 0;
    forEachRight(undefined, () => { iterations += 1; });
    expect(iterations).toEqual(0);
  });
});
