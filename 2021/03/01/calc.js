const { compose, reduce, split, values } = require('ramda');

const g = (acc, {0: o, 1: i}) => `${acc}${o > i ? '0' : '1'}`;
const l = (acc, {0: o, 1: i}) => `${acc}${o < i ? '0' : '1'}`;

const res = [];

const calc = (acc, value) => {
  const binary = split('', value);

  for (let i=0; i < binary.length; i++) {
    if (!res[i]) {
      res[i] = {1: 0, 0: 0};
    }

    res[i][binary[i]]++;
  }
};

module.exports = (input) => {
  reduce(calc, undefined, input);
  return parseInt(reduce(g, '', res), 2) * parseInt(reduce(l, '', res), 2);
};
