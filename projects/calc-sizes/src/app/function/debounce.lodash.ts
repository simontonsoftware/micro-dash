import debounce from "lodash-es/debounce";

debounce(() => {})();
debounce((value: number) => {
  console.log(value);
}, 1)(1);
