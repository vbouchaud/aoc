module.exports = (input) => {
  const grouped = [];
  for (let i = 0; i < input.length - 2; i++) {
    grouped.push(input[i] + input[i+1] + input[i+2]);
  }

  let previous = -1;
  let res = 0;
  for (let i = 0; i < grouped.length; i++) {
    if (previous !== -1 && grouped[i] > previous) {
      res++;
    }
    previous = grouped[i];
  }

  return res;
};

