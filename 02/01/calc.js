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
};

readInterface.on('close', () => {
  const res = reduce((acc, value) => sum(acc, command(value)), {x: 0, depth: 0}, commands);

  console.log(res.x * res.depth);
});

