import {pick} from './pick';

describe('pick()', () => {

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should pick single field', () => {
    expect(pick({a: 1, b: 2, c: 3}, 'a')).toEqual({a: 1});
  });

  it('should pick multiple fields', () => {
    expect(pick({a: 1, b: 2, c: 3}, 'a', 'c')).toEqual({a: 1, c: 3});
  });

  it('should pick all fields', () => {
    expect(pick({a: 1, b: 2, c: 3}, 'a', 'b', 'c'))
      .toEqual({a: 1, b: 2, c: 3});
  });

  it('should not mutate original object', () => {
    let object = {a: 1, b: 2, c: 3};
    pick(object, 'a', 'b');
    expect(object).toEqual({a: 1, b: 2, c: 3});
  });

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should flatten `paths`', () => {
    expect(pick({a: 1, b: 2, c: 3, d: 4}, 'a', 'c')).toEqual({a: 1, c: 3});
  });

  it('should coerce `paths` to strings', () => {
    expect(pick({0: 'a', 1: 'b'}, 0 as any)).toEqual({0: 'a'});
  });

  it('should return an empty object when `object` is nullish', () => {
    expect(pick<any>(null, 'valueOf')).toEqual({});
    expect(pick<any>(undefined, 'valueOf')).toEqual({});
  });

  it('should work with a primitive `object`', () => {
    expect(pick<any>('', 'slice')).toEqual({slice: ''.slice});
  });

  it('should create an object of picked string keyed properties', () => {
    const object = {a: 1, b: 2, c: 3, d: 4};

    expect(pick(object, 'a')).toEqual({a: 1});
  });

  it('should work with an array `object`', () => {
    let array = [1, 2, 3];
    expect(pick<any>(array, '1')).toEqual({1: 2});
  });
});
