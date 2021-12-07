const {
  map,
  split,
  compose,
  head,
  tail,
  splitEvery,
  join,
  filter,
  isEmpty,
  not,
  length,
  pluck,
  reduce,
  and,
  transpose,
  either,
  flatten,
  propEq,
  sum,
  or,
} = require('ramda');

const getNumbers = compose(map(Number), split(','), head);

const getBoards = compose(map(compose(map(compose(map(n => ({ n: Number(n), b: false})) , filter(compose(not, isEmpty)), split(' '))), tail)), splitEvery(6), tail);

const check = compose(reduce(or, false), map(compose(reduce(and, true), pluck('b'))));

const bingo = either(check, compose(check, transpose));

const leftovers = compose(sum, pluck('n'), filter(propEq('b', false)), flatten);

module.exports = (input) => {
  const numbers = getNumbers(input);
  const boards = getBoards(input);

  for (let i = 0; i < length(numbers); i++) {
    let number = numbers[i];

    for (let j = 0; j < length(boards); j++) {
      let board = boards[j];

      for (let k = 0; k < length(board); k++) {
        const line = board[k];

        for (let l = 0; l < length(line); l++) {
          const cell = line[l];
          if (cell.n === number) {
            cell.b = true;
          }
        }
      }

      if (bingo(board)) {
        return number * leftovers(board);
      }
    }
  }

  return 0;
};
