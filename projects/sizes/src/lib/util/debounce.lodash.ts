import debounce from 'lodash-es/debounce';
debounce(() => {})();
let lastValue;
debounce((value: number) => {
  lastValue = value;
}, 1)(1);
