import pickBy from "lodash-es/pickBy";
pickBy({ a: 1 }, () => true);
pickBy({ a: 1 }, () => false);
