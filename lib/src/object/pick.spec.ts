import {pick} from './pick';

// stolen from https://github.com/healthiers/mini-dash
describe('pick()', function () {
  it('should pick single field', function () {
    expect(pick({a: 1, b: 2, c: 3}, ['a'])).toEqual({a: 1});
  });

  it('should pick multiple fields', function () {
    expect(pick({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({a: 1, c: 3});
  });

  it('should pick all fields', function () {
    expect(pick({a: 1, b: 2, c: 3}, ['a', 'b', 'c']))
      .toEqual({a: 1, b: 2, c: 3});
  });

  it('should not mutate original object', function () {
    let object = {a: 1, b: 2, c: 3};
    pick(object, ['a', 'b']);
    expect(object).toEqual({a: 1, b: 2, c: 3});
  });
});
