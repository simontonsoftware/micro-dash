import { debounce } from './debounce';
import { fakeAsync, tick } from '@angular/core/testing';

describe('debounce()', () => {
  it(
    'defaults `wait` to 0',
    fakeAsync(() => {
      let callCount = 0;
      const debounced = debounce(() => {
        ++callCount;
      });

      debounced();
      expect(callCount).toBe(0);

      tick(0);
      expect(callCount).toBe(1);
    }),
  );

  //
  // stolen from https://github.com/lodash/lodash
  //

  it(
    'should debounce a function',
    fakeAsync(() => {
      let callCount = 0;
      const debounced = debounce(() => {
        ++callCount;
      }, 32);

      debounced();
      debounced();
      debounced();
      expect(callCount).toBe(0);

      tick(128);
      expect(callCount).toBe(1);

      debounced();
      debounced();
      debounced();
      expect(callCount).toBe(1);

      tick(256);
      expect(callCount).toBe(2);
    }),
  );

  it(
    'should not immediately call `func` when `wait` is `0`',
    fakeAsync(() => {
      let callCount = 0;
      const debounced = debounce(() => {
        ++callCount;
      }, 0);

      debounced();
      debounced();
      expect(callCount).toBe(0);

      tick(5);
      expect(callCount).toBe(1);
    }),
  );

  it(
    'should invoke the call with the correct arguments',
    fakeAsync(() => {
      let actual: any[] | undefined;
      let callCount = 0;
      const object = {};
      const debounced = debounce(function(...args: any[]) {
        actual = args;
        ++callCount;
      }, 32);

      debounced.call(object, 'a');
      debounced.call(object, 'b', 3);
      tick(64);
      expect(callCount).toBe(1);
      expect(actual).toEqual(['b', 3]);
    }),
  );
});
