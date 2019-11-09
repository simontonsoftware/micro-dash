import { get } from "../lib/object";

class Wrap1 {
  value?: number;
}

class Wrap2 {
  wrap1 = new Wrap1();
  value = "bye";
}

class Wrap3 {
  wrap2 = new Wrap2();
  value?: Date;
}

class Cycle {
  next!: Cycle;
  value!: number;
}

// $ExpectType number | undefined
get(new Wrap1(), ["value"]);
// $ExpectType number
get(new Wrap1(), ["value"], 1);

// $ExpectType Wrap1
get(new Wrap2(), ["wrap1"]);
// $ExpectType number | undefined
get(new Wrap2(), ["wrap1", "value"]);

// $ExpectType Wrap1
get(new Wrap3(), ["wrap2", "wrap1"]);
// $ExpectType number | undefined
get(new Wrap3(), ["wrap2", "wrap1", "value"]);
// $ExpectType number
get(new Wrap3(), ["wrap2", "wrap1", "value"], 1);

// $ExpectType Cycle
get(new Cycle(), ["next", "next", "next", "next"]);
// $ExpectType any
get(new Cycle(), ["next", "next", "next", "next", "next"]);

// when D is a different type than at the path
// $ExpectType Wrap1
get(new Wrap3(), ["wrap2", "wrap1"], "hi");
// $ExpectType number | "hi"
get(new Wrap2(), ["wrap1", "value"], "hi");

// when T can be undefined
const wOrU = undefined as Wrap3 | undefined;
// $ExpectType Wrap1 | undefined
get(wOrU, ["wrap2", "wrap1"]);

// fallback to `any` for e.g. a string array
const path = ["a", "b"];
// $ExpectType any
get(new Cycle(), path);

// passing a key instead of a path
// $ExpectType number | undefined
get(new Wrap1(), "value");
// $ExpectType number
get(new Wrap1(), "value", 1);
// $ExpectType Wrap1
get(new Wrap2(), "wrap1", 1);
// $ExpectType number | "hi"
get(new Wrap1(), "value", "hi");
// $ExpectType Wrap2 | undefined
get(wOrU, "wrap2");
