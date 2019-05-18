import { fakeAsync, tick } from "@angular/core/testing";
import { expectSingleCallAndReset, expectType } from "s-ng-dev-utils";
import { debounce } from "./debounce";

describe("debounce()", () => {
  it("defaults `wait` to 0", fakeAsync(() => {
    const spy = jasmine.createSpy();
    const debounced = debounce(spy);

    debounced();
    expect(spy).not.toHaveBeenCalled();

    tick(0);
    expectSingleCallAndReset(spy);
  }));

  it("has fancy typing", () => {
    const debounced = debounce((_s: string, _n: number) => "hi");
    expectType<[string, number], Parameters<typeof debounced>>();
    expectType<void, ReturnType<typeof debounced>>();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should debounce a function", fakeAsync(() => {
    const spy = jasmine.createSpy();
    const debounced = debounce(spy, 32);

    debounced();
    debounced();
    debounced();
    expect(spy).not.toHaveBeenCalled();

    tick(128);
    expectSingleCallAndReset(spy);

    debounced();
    debounced();
    debounced();
    expect(spy).not.toHaveBeenCalled();

    tick(256);
    expectSingleCallAndReset(spy);
  }));

  it("should not immediately call `func` when `wait` is `0`", fakeAsync(() => {
    const spy = jasmine.createSpy();
    const debounced = debounce(spy, 0);

    debounced();
    debounced();
    expect(spy).not.toHaveBeenCalled();

    tick(5);
    expectSingleCallAndReset(spy);
  }));

  it("should invoke the call with the correct arguments", fakeAsync(() => {
    const object = {};
    const spy = jasmine.createSpy();
    const debounced = debounce(spy, 32);

    debounced.call(object, "a");
    debounced.call(object, "b", 3);
    tick(64);
    expectSingleCallAndReset(spy, "b", 3);
  }));
});
