const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

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

module.exports = compose(length, reduce(it, __, times(identity, 80)), map(Number), split(','), head);
