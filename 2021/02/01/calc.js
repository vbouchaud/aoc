const { split, reduce } = require('ramda');

const sum = ({x: ax, depth: adepth}, {x: bx, depth: bdepth}) => ({x: ax + bx, depth: adepth + bdepth});

const command = str => {
  const [ cmd, value ] = split(' ', str);
  if (cmd === 'forward') {
    return { x: Number(value), depth: 0 };
  }
  if (cmd === 'down') {
    return { x: 0, depth: Number(value) };
  }
  if (cmd === 'up') {
    return { x: 0, depth: -Number(value) };
  }
  return { x: 0, depth: 0 };
};

module.exports = (input) => {
  const res = reduce((acc, value) => sum(acc, command(value)), {x: 0, depth: 0}, input);

  return res.x * res.depth;
};
