#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const { compose, reduce, split } = require('ramda');

const readInterface = readline.createInterface({
  input: fs.createReadStream('input.txt'),
});

const commands = [];
readInterface.on('line', line => {
  commands.push(line);
});

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

readInterface.on('close', () => {
  const res = reduce(calc, {x: 0, depth: 0, aim: 0}, commands);

  console.log(res.x * res.depth);
});

