const {
  compose,
  split,
  head,
  map,
  mean,
  reduce,
} = require('ramda');

const getCrabs = compose(map(Number), split(','), head);

const getMean = compose(Math.round, mean, getCrabs);

const getFuel = mean => reduce((acc, value) => {
  const diff = Math.abs(mean - value);
  return acc + (diff + 1) * diff / 2;
}, 0);

module.exports = input => {
  const mean = getMean(input);
  const crabs = getCrabs(input);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);

  let val = Infinity;
  for (let i = min; i <= max; i++) {
    let temp = getFuel(i)(crabs);
    if (temp < val) {
      val = temp;
    }
  }

  return val;
};
