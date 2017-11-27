import {debounce} from 'micro-dash';
debounce(() => {})();
let lastValue;
debounce((value: number) => { lastValue = value; }, 1)(1);
