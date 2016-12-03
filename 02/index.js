const fs = require('fs');
const RAW_INPUT = fs.readFileSync(`${ __dirname }/input`).toString();
const INPUT_ROWS = RAW_INPUT.split('\n').slice(0, -1);

const INVALID_CHAR = ' ';
const MOVEMENT_MAP = {
  U: [ 0, -1],
  D: [ 0,  1],
  L: [-1,  0],
  R: [ 1,  0],
}

const PAD_1 = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];
const START_POS_1 = [1, 1];
const PAD_2 = [
  [' ', ' ', '1', ' ', ' '],
  [' ', '2', '3', '4', ' '],
  ['5', '6', '7', '8', '9'],
  [' ', 'A', 'B', 'C', ' '],
  [' ', ' ', 'D', ' ', ' '],
];
const START_POS_2 = [0, 2];

const addPos = ([x1, y1], [x2, y2]) => {
  return [x1 + x2, y1 + y2];
}

const solve = (pad, startPos, rows) => {
  const padCols = pad[0].length;
  const padRows = pad.length;

  const getPadChar = ([x, y]) => {
    if (
      x >= 0 && x < padCols &&
      y >= 0 && y < padRows
    ) {
      return pad[y][x];
    }

    return INVALID_CHAR;
  };

  const tryToMove = (from, direction) => {
    const newPos = addPos(from, MOVEMENT_MAP[direction]);
    const char = getPadChar(newPos);

    if (char !== INVALID_CHAR) {
      return newPos;
    }
    return from;
  };


  let currentPos = startPos;
  const code = [];

  rows.forEach((row) => {
    // console.log(currentPos, 'doing row!', row);

    for (let i = 0; i < row.length; i += 1) {
      const direction = row[i];
      currentPos = tryToMove(currentPos, row[i]);
    }

    const char = getPadChar(currentPos);
    code.push(char);
  });

  return code;
};

const solve1 = () => solve(PAD_1, START_POS_1, INPUT_ROWS);
const solve2 = () => solve(PAD_2, START_POS_2, INPUT_ROWS);

console.log('The code is:', solve2().join(''));
