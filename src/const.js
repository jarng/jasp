export const ROWS = 40;
export const COLUMNS = 100;

const UP = [-1, 0];
const RIGHT = [0, 1];
const DOWN = [1, 0];
const LEFT = [0, -1];
const UP_RIGHT = [-1, 1];
const DOWN_RIGHT = [1, 1];
const DOWN_LEFT = [1, -1];
const UP_LEFT = [-1, -1];

// with diagonals
export const DIRECTIONS = [
  UP,
  UP_RIGHT,
  RIGHT,
  DOWN,
  DOWN_RIGHT,
  LEFT,
  DOWN_LEFT,
  UP_LEFT,
];

// export const DIRECTIONS = [UP, RIGHT, DOWN, LEFT];

export const DELAY_MS = 10;
export const WALL_RATIO = 0.69;
