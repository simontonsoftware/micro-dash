import { identity, isArray, noop } from 'lodash-es';
import { functions } from './functions';

describe('functions()', () => {
  it('does not include constructors', () => {
    class MyClass {
      a = 1;

      b(): number {
        return 2;
      }
    }
    expect(functions(MyClass.prototype)).toEqual(['b']);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the function names of an object', () => {
    const object = { a: 'a', b: identity, c: /x/, d: noop };
    expect(functions(object).sort()).toEqual(['b', 'd']);
  });

  it('should not include inherited functions', () => {
    function Foo(this: any): void {
      this.a = identity;
      this.b = 'b';
    }
    Foo.prototype.c = noop;

    expect(functions(new (Foo as any)())).toEqual(['a']);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = functions(array);
    expect(isArray(actual)).toBe(true);
    expect(actual as any).not.toBe(array);
  });
});
