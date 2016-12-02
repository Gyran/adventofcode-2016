const fs = require('fs');
const input = fs.readFileSync(`${ __dirname }/input`).toString();

const rows = input.split('\n').slice(0, -1);

const part1 = (rows) => {

};

const PAD = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const PAD_COLS = 3;
const PAD_ROWS = 3;
const MAP = {
  U: [ 0, -1],
  D: [ 0,  1],
  L: [-1,  0],
  R: [ 1,  0],
}

const inInterval = (i, min, max) => {
  return Math.min(Math.max(i, min), max);
}

const addPos = (a, b) => {
  const x = inInterval(a[0] + b[0], 0, PAD_COLS - 1);
  const y = inInterval(a[1] + b[1], 0, PAD_ROWS - 1);

  return [x, y];
}

const code = [];
let currenPos = [1, 1];
rows.forEach((row) => {
  console.log(currenPos, 'doing row!', row);

  for (let i = 0; i < row.length; i += 1) {
    const direction = row[i];
    currenPos = addPos(currenPos, MAP[row[i]]);
    console.log('currenPos', direction, currenPos);
  }

  code.push(PAD[currenPos[1]][currenPos[0]]);
  console.log(PAD[currenPos[1]][currenPos[0]]);
});

console.log('The code is:', code.join(''));
