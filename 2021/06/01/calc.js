const {
  compose,
  split,
  reduce,
  __,
  times,
  identity,
  head,
  map,
  length,
  flatten,
} = require('ramda');

const it = acc => {
  let res = [];

  for (let i = 0; i < length(acc); i++) {
    if (acc[i] === 0) {
      res = [ 8, 6, ...res ];
    } else {
      res = [ acc[i] - 1, ...res ];
    }
  }

  return res;
};

const precalc = reduce(it, __, times(identity, 80));

module.exports = input => {
  const res = {};
  for (let i = 0 ; i <= 8; i++) {
    res[i] = precalc([i]);
  }

  const calc = compose(length, flatten, reduce((acc, n) => [ ...acc, res[n]], []), map(Number), split(','), head);

  return calc(input);
};
