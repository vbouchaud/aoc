const { reduce, split } = require('ramda');

const calc = ({x, depth, aim}, command) => {
  let [ cmd, value ] = split(' ', command);
  value = Number(value);

  if (cmd === 'down') {
    return { x: x, depth: depth, aim: aim + value };
  }
  if (cmd === 'up') {
    return { x: x, depth: depth, aim: aim - value };
  }
  if (cmd === 'forward') {
    return { x: x + value, depth: depth + (aim*value), aim: aim };
  }
  return {x, depth, aim};
};

module.exports = (input) => {
  const res = reduce(calc, {x: 0, depth: 0, aim: 0}, input);

  return res.x * res.depth;
};
