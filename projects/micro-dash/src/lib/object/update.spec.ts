import { constant } from 'lodash';
import { stub } from 'sinon';
import { update } from './update';

describe('update()', () => {
  it('creates an array (only) for missing integer keys', () => {
    const object: any[] = [];
    update(object, [1, 'b', 3.7, 4], updater);
    expect(object).toEqual([, { b: { '3.7': [, , , , value] } }]);
  });

  /** documented difference from lodash */
  it('assigns values even if they are the same as their destination', () => {
    for (const equalValue of ['a', ['a'], { a: 1 }, NaN]) {
      const object = {};
      const setter = stub();
      const theValue = constant(equalValue);
      Object.defineProperty(object, 'a', {
        configurable: true,
        enumerable: true,
        get: theValue,
        set: setter,
      });

      update(object, ['a'], theValue);

      expect(setter.callCount).toBe(1);
    }
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  const oldValue = 1;
  const value = 2;
  const updater = constant(value);

  it('should set property values', () => {
    const object = { a: oldValue };

    const returned = update(object, ['a'], updater);

    expect(returned).toBe(object);
    expect(object.a).toBe(value);
  });

  it('should set deep property values', () => {
    const object = { a: { b: oldValue } };

    const actual = update(object, ['a', 'b'], updater);

    expect(actual).toBe(object);
    expect(object.a.b).toBe(value);
  });

  it('should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 1, a: { b: { c: 1 } } };
    update(object, ['a', 'b', 'c'], updater);
    expect(object.a.b.c).toBe(value);
  });

  it('should handle empty paths', () => {
    const object = {};

    update(object, [], updater);
    expect(object).toEqual({});

    update(object, [''], updater);
    expect(object).toEqual({ '': value });
  });

  it('should handle complex paths', () => {
    const object = {
      a: {
        '-1.23': {
          '["b"]': { c: { "['d']": { '\ne\n': { f: { g: oldValue } } } } },
        },
      },
    };
    const path = ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'];

    update(object, path, updater);

    expect(object.a['-1.23']['["b"]'].c["['d']"]['\ne\n'].f.g).toBe(value);
  });

  it('should create parts of `path` that are missing', () => {
    const object: any = {};

    const actual = update(object, ['a', '1', 'b', 'c'], updater);

    expect(actual).toBe(object);
    expect(actual).toEqual({ a: { '1': { b: { c: value } } } });
    expect('0' in object.a).toBe(false);
  });

  it('should not error when `object` is nullish', () => {
    expect(update(null, ['a', 'b'], updater)).toEqual(null);
    expect(update(undefined, ['a', 'b'], updater)).toEqual(undefined);
  });

  it('should overwrite primitives in the path', () => {
    const object: any = { a: '' };
    update(object, ['a', 'b'], updater);
    expect(object).toEqual({ a: { b: 2 } });
  });

  it('should not create an array for missing non-index property names that start with numbers', () => {
    const object = {};
    update(object, ['1a', '2b', '3c'], updater);
    expect(object).toEqual({ '1a': { '2b': { '3c': value } } });
  });

  it('should invoke `updater` with the value on `path` of `object`', () => {
    const object = { a: [{ b: { c: oldValue } }] };
    update(object, ['a', 0, 'b', 'c'], (n: any) => {
      expect(n).toBe(oldValue);
      return ++n;
    });
    expect(object.a[0].b.c).toBe(oldValue + 1);
  });
});
