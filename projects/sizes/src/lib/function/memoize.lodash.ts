import memoize from "lodash-es/memoize";
memoize((a: any) => 1)("a");
memoize((a: any) => 1, (b: any) => 2)("a");
