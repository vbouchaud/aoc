const { split, filter, test } = require('ramda');

const calc = (choose, input, index) => {
  const res = {1: 0, 0: 0};

  for (let i = 0; i < input.length; i++) {
    res[split('', input[i])[index]]++;
  }

  return choose(res);
};

const gaz = choose => (input, pattern = '^', index = 0) => {
  if (input.length > 1) {
    let p = `${pattern}${calc(choose, input, index)}`;
    return gaz(choose)(filter(test(new RegExp(p)), input), p, index + 1);
  }
  return parseInt(input[0], 2);
};

module.exports = (input) => {
  return gaz(({0: o, 1: i}) => o <= i ? '0' : '1')(input) * gaz(({0: o, 1: i}) => i >= o ? '1' : '0')(input);
};
