import { invoke } from './invoke';

describe('invoke()', () => {
  it('sets the context correctly when only 1 deep', () => {
    const spy = jasmine.createSpy();
    const obj = { a: spy };

    invoke(obj, ['a']);

    expect(spy.calls.first().object).toBe(obj);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should invoke a method on `object`', () => {
    expect(invoke({ a: () => 'A' }, ['a'])).toBe('A');
  });

  it('should support invoking with arguments', () => {
    const obj = { a: (a: any, b: any) => [a, b] };
    expect(invoke(obj, ['a'], 1, 2)).toEqual([1, 2]);
  });

  it('should not error on nullish elements', () => {
    expect(invoke(null, ['a', 'b'], 1, 2)).toBeUndefined();
    expect(invoke(undefined, ['a', 'b'], 1, 2)).toBeUndefined();
  });

  it('should support deep paths', () => {
    const obj = { a: { b: (a: any, b: any) => [a, b] } };
    expect(invoke(obj, ['a', 'b'], 1, 2)).toEqual([1, 2]);
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const obj = {
      a: {
        b() {
          return this.c;
        },
        c: 1,
      },
    };
    expect(invoke(obj, ['a', 'b'])).toBe(1);
  });
});
