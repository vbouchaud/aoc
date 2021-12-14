const {
  compose,
  split,
  identity,
  head,
  map,
  countBy,
  times,
  reduce,
  __,
  values,
  sum,
} = require('ramda');

const iterations = 256;

const calc = ({ '0': zero = 0, '1': one = 0, '2': two = 0, '3': three = 0, '4': four = 0, '5': five = 0, '6': six = 0, '7': seven = 0, '8': eight = 0 }) => ({
  0: one,
  1: two,
  2: three,
  3: four,
  4: five,
  5: six,
  6: seven + zero,
  7: eight,
  8: zero,
});

module.exports = compose(sum, values, reduce(calc, __, times(identity, iterations)), countBy(identity), map(Number), split(','), head);
