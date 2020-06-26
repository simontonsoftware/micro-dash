import throttle from 'lodash-es/throttle';

throttle(() => {})();
throttle(
  (value: number) => {
    console.log(value);
  },
  1,
  { leading: false },
)(1);
