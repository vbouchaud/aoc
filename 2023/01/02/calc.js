const {
  compose,
  map,
  replace,
  head,
  last,
  join,
  sum,
  keys,
  reverse,
} = require("ramda");

const numbers = {
  one:   "1",
  two:   "2",
  three: "3",
  four:  "4",
  five:  "5",
  six:   "6",
  seven: "7",
  eight: "8",
  nine:  "9",
}

const frombeg = replace(new RegExp(`(${join('|', keys(numbers))})`, 'g'), n => numbers[n]);
const fromend = compose(reverse, replace(new RegExp(`(${join('|', map(reverse, keys(numbers)))})`, 'g'),n => numbers[reverse(n)]), reverse);

module.exports = compose(sum, map(compose(Number, join(''), a => [head(a), last(a)], replace(/[a-z]/g, ""), join(''), s => [ frombeg(s), fromend(s)])))
