import isFunction from "lodash-es/isFunction";
console.log(isFunction("a"));
console.log(isFunction(() => {}));
