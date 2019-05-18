import every from "lodash-es/every";

every([1], () => true);
every({ a: 1 }, () => false);
