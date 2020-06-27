import { fakeAsync, tick } from '@angular/core/testing';
import { expectSingleCallAndReset } from 's-ng-dev-utils';
import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    spyOn(performance, 'now').and.callFake(() => Date.now());
  });

  function expectCallIn(millis: number, spy: jasmine.Spy): void {
    tick(millis - 1);
    expect(spy).not.toHaveBeenCalled();
    tick(1);
    expectSingleCallAndReset(spy);
  }

  function expectNoCallIn(millis: number, spy: jasmine.Spy): void {
    tick(millis);
    expect(spy).not.toHaveBeenCalled();
  }

  it('respects `leading: false` after a cooldown', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: false });

    throttled();
    expectCallIn(32, spy);
    expectNoCallIn(32, spy); // cool down

    throttled();
    expectCallIn(32, spy);
  }));

  it('keeps a deadline when `leading: false`', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: false });

    throttled();
    expectNoCallIn(16, spy);
    throttled();
    expectCallIn(16, spy);

    expectNoCallIn(32, spy);
  }));

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should throttle a function', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);

    throttled();
    throttled();
    throttled();

    const lastCount = spy.calls.count();
    tick(64);
    expect(spy.calls.count()).toBeGreaterThan(lastCount);
  }));

  it('should clear timeout when `func` is called', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);

    throttled();
    throttled();
    tick(64);

    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('should not trigger a trailing call when invoked once', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);

    throttled();
    expect(spy).toHaveBeenCalledTimes(1);

    tick(64);
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should trigger a call when invoked repeatedly', () => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);
    const start = Date.now();

    while (Date.now() - start < 320) {
      throttled();
    }

    expect(spy.calls.count()).toBeGreaterThan(1);
  });

  it('should trigger a call when invoked repeatedly and `leading` is false', () => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: false });
    const start = performance.now();

    while (performance.now() - start < 320) {
      throttled();
    }

    expect(spy.calls.count()).toBeGreaterThan(1);
  });

  it('should trigger a second throttled call as soon as possible', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 128, { leading: false });

    throttled();

    tick(192);
    expect(spy.calls.count()).toBe(1);
    throttled();

    tick(62);
    expect(spy.calls.count()).toBe(1);
    throttled();

    tick(256);
    expect(spy.calls.count()).toBe(2);
  }));

  it('should apply default options', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, {});

    throttled();
    throttled();
    tick(128);

    expect(spy).toHaveBeenCalledTimes(2);
  }));

  it('should support a `leading` option', () => {
    const spy = jasmine.createSpy();
    throttle(spy, 32, { leading: true })();
    expectSingleCallAndReset(spy);

    throttle(spy, 32, { leading: false })();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should support a `trailing` option', fakeAsync(() => {
    let spy = jasmine.createSpy();
    let throttled = throttle(spy, 64, { trailing: true });
    throttled();
    throttled();
    tick(256);
    expect(spy).toHaveBeenCalledTimes(2);

    spy = jasmine.createSpy();
    throttled = throttle(spy, 64, { trailing: false });
    throttled();
    throttled();
    tick(256);
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 64, { trailing: false });

    throttled();
    throttled();

    tick(96);
    throttled();
    throttled();

    tick(96);
    expect(spy.calls.count()).toBeGreaterThan(1);
  }));

  it('should work with a system time of `0`', fakeAsync(() => {
    const nowSpy = spyOn(Date, 'now').and.returnValue(0);
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);

    throttled();
    throttled();
    throttled();
    expect(spy.calls.count()).toBe(1);

    nowSpy.and.returnValue(64);
    tick(64);
    expect(spy.calls.count()).toBe(2);
  }));

  it('should use a default `wait` of `0`', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy);

    throttled();
    tick(32);
    throttled();

    expect(spy.calls.count()).toBe(2);
  }));

  it('supports recursive calls', fakeAsync(() => {
    const queue = ['b', 'c'];
    const processed: string[] = [];
    const throttled = throttle((item: string) => {
      processed.push(item);

      const next = queue.shift();
      if (next) {
        throttled(next);
      }
    }, 32);

    throttled('a');

    tick(256);
    expect(processed).toEqual(['a', 'b', 'c']);
  }));

  it('should support cancelling delayed calls', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: false });

    throttled();
    throttled.cancel();

    tick(64);
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should reset `lastCalled` after cancelling', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: true });

    throttled();
    expect(spy.calls.count()).toBe(1);

    throttled.cancel();
    throttled();
    expect(spy.calls.count()).toBe(2);
    throttled();

    tick(64);
    expect(spy.calls.count()).toBe(3);
  }));

  it('should support flushing delayed calls', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32, { leading: false });

    throttled();
    throttled.flush();

    expectSingleCallAndReset(spy);
    expectNoCallIn(64, spy);
  }));

  it('should noop `cancel` and `flush` when nothing is queued', fakeAsync(() => {
    const spy = jasmine.createSpy();
    const throttled = throttle(spy, 32);

    throttled.cancel();
    throttled.flush();

    expectNoCallIn(64, spy);
  }));
});
