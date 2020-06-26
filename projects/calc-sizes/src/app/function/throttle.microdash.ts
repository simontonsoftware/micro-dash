import { throttle } from 'micro-dash';

throttle(() => {})();
throttle(
  (value: number) => {
    console.log(value);
  },
  1,
  { leading: false },
)(1);
