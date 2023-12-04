const {
  compose,
  map,
  replace,
  head,
  last,
  join,
  sum,
} = require("ramda");

module.exports = compose(sum, map(compose(Number, join(''), a => [head(a), last(a)], replace(/[a-zA-Z]/g, ""))))
