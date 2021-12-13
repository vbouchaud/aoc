const {
  map,
  length,
  reduce,
  split,
  compose,
  filter,
  prop,
  values,
} = require('ramda');

const vectorPattern = /^(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+).(?<y2>\d+)$/;

const direction = (a, b) => {
  if (a > b) {
    return -1;
  }
  return 1;
};

class Coord {
  constructor(x, y) {
    this.x = Number(x);
    this.y = Number(y);
  }

  get ref() {
    return `${this.x};${this.y}`;
  }
}

class Vector {
  static create(coords) {
    const match = vectorPattern.exec(coords);
    return new Vector(match.groups.x1, match.groups.y1, match.groups.x2, match.groups.y2);
  }

  get horizontal() {
    return this.start.x === this.end.x;
  }

  get vertical() {
    return this.start.y === this.end.y;
  }

  get course() {
    const course = [];

    if (this.vertical) {
      for (let i = this.start.x; i != this.end.x; i += direction(this.start.x, this.end.x)) {
        course.push(new Coord(i, this.start.y));
      }
      course.push(this.end);
    } else if (this.horizontal) {
      for (let i = this.start.y; i != this.end.y; i += direction(this.start.y, this.end.y)) {
        course.push(new Coord(this.start.x, i));
      }
      course.push(this.end);
    }

    return course;
  }

  constructor(x1, y1, x2, y2) {
    this.start = new Coord(x1, y1);
    this.end = new Coord(x2, y2);
  }
}

const drawMap = (m, vector) => {
  const course = vector.course;

  for (let i = 0; i < length(course); i++) {
    if (m[course[i].ref] === undefined) {
      m[course[i].ref] = 0;
    }
    m[course[i].ref]++;
  }

  return m;
};

module.exports = compose(length, filter(n => n > 1), values, reduce(drawMap, {}), map(Vector.create));
