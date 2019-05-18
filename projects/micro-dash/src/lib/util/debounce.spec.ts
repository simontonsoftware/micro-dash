import { expectSingleCallAndReset } from "s-ng-dev-utils";
import { debounce } from "./debounce";
import { fakeAsync, tick } from "@angular/core/testing";

describe("debounce()", () => {
  it("defaults `wait` to 0", fakeAsync(() => {
    let callCount = 0;
    const debounced = debounce(() => {
      ++callCount;
    });

    debounced();
    expect(callCount).toBe(0);

    tick(0);
    expect(callCount).toBe(1);
  }));

  it("has fancy typing", () => {
    const debounced = debounce((s: string, n: number) => "hi");
    const plastic: unknown = 0;
    const params: [string, number] = plastic as Parameters<typeof debounced>;
    const ret: void = plastic as ReturnType<typeof debounced>;
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should debounce a function", fakeAsync(() => {
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
  }));

  it("should not immediately call `func` when `wait` is `0`", fakeAsync(() => {
    let callCount = 0;
    const debounced = debounce(() => {
      ++callCount;
    }, 0);

    debounced();
    debounced();
    expect(callCount).toBe(0);

    tick(5);
    expect(callCount).toBe(1);
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
