const {
  compose,
  split,
  head,
  map,
  median,
  reduce,
} = require('ramda');

const getCrabs = compose(map(Number), split(','), head);

const getMedian = compose(Math.round, median, getCrabs);

const getFuel = median => reduce((acc, value) => acc + Math.abs(median - value), 0);

module.exports = input => {
  const median = getMedian(input);
  const crabs = getCrabs(input);
  return getFuel(median)(crabs);
};
