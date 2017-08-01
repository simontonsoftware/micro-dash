import {omit} from './';

describe('omit()', () => {

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should omit single field', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a')).toEqual({b: 2, c: 3});
  });

  it('should omit multiple fields', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a', 'c')).toEqual({b: 2});
  });

  it('should omit all fields', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a', 'b', 'c')).toEqual({});
  });

  it('should not mutate original object', function () {
    let object = {a: 1, b: 2, c: 3};
    expect(omit(object, 'a', 'b')).toEqual({c: 3});
    expect(object).toEqual({a: 1, b: 2, c: 3});
  });

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should flatten `paths`', () => {
    const object = {a: 1, b: 2, c: 3, d: 4};
    expect(omit(object, 'a', 'c')).toEqual({b: 2, d: 4});
  });

  it('should coerce `paths` to strings', () => {
    expect(omit({0: 'a'}, 0 as any)).toEqual({});
  });

  it('should return an empty object when `object` is nullish', () => {
    expect(omit<any>(null, 'valueOf')).toEqual({});
    expect(omit<any>(undefined, 'valueOf')).toEqual({});
  });

  it('should not mutate `object`', () => {
    let object = {a: {b: 2}};
    omit(object, 'a');
    expect(object).toEqual({a: {b: 2}});
  });

  it('should create an object with omitted string keyed properties', () => {
    const object = {a: 1, b: 2, c: 3, d: 4};
    expect(omit(object, 'a')).toEqual({b: 2, c: 3, d: 4});
  });
});
