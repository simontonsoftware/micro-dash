import {stub} from 'sinon';
import {forEach} from './for-each';
import {noop} from 'lodash';

describe('forEach()', () => {
  it('works on undefined', () => {
    let count = 0;
    forEach(undefined, () => { ++count; });
    expect(count).toEqual(0);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    forEach([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    forEach(array, logger);

    expect(logger.args).toEqual([[1, 0], [undefined, 1], [3, 2]]);
  });

  it('should not iterate custom properties', () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub();

    forEach(array, logger);

    expect(logger.args).toEqual([[1, 0]]);
  });

  it('iterates over own string keyed properties of objects', () => {
    function Foo() {
      this.a = 1;
    }

    Foo.prototype.b = 2;
    const logger = stub();

    forEach(new (Foo as any), logger);

    expect(logger.args).toEqual([[1, 'a']]);
  });

  it('should return the collection', () => {
    const array = [1, 2, 3];

    expect(forEach(array, noop)).toBe(array);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    let count = 0;

    forEach(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
    });

    expect(count).toEqual(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = {a: 1};
    let count = 0;

    forEach(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });
});
