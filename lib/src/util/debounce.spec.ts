import { debounce } from './debounce';

describe('debounce()', () => {
  beforeEach(() => { jasmine.clock().install(); });
  afterEach(() => { jasmine.clock().uninstall(); });

  it('defaults `wait` to 0', () => {
    let callCount = 0;
    const debounced = debounce(() => { ++callCount; });

    debounced();
    expect(callCount).toBe(0);

    jasmine.clock().tick(0);
    expect(callCount).toBe(1);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should debounce a function', () => {
    let callCount = 0;
    const debounced = debounce(() => { ++callCount; }, 32);

    debounced();
    debounced();
    debounced();
    expect(callCount).toBe(0);

    jasmine.clock().tick(128);
    expect(callCount).toBe(1);

    debounced();
    debounced();
    debounced();
    expect(callCount).toBe(1);

    jasmine.clock().tick(256);
    expect(callCount).toBe(2);
  });

  it('should not immediately call `func` when `wait` is `0`', () => {
    let callCount = 0;
    const debounced = debounce(() => { ++callCount; }, 0);

    debounced();
    debounced();
    expect(callCount).toBe(0);

    jasmine.clock().tick(5);
    expect(callCount).toBe(1);
  });

  it('should invoke the call with the correct arguments', () => {
    let actual: any[] | undefined;
    let callCount = 0;
    const object = {};
    const debounced = debounce(
      function (...args: any[]) {
        actual = args;
        ++callCount;
      },
      32,
    );

    debounced.call(object, 'a');
    debounced.call(object, 'b', 3);
    jasmine.clock().tick(64);
    expect(callCount).toBe(1);
    expect(actual).toEqual(['b', 3]);
  });
});
