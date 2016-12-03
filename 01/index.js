const fs = require('fs');
const RAW_INPUT = fs.readFileSync(`${ __dirname }/input`).toString();

const inputs = RAW_INPUT.split(', ');

const START_POS = [0, 0];
const START_DIR = 0;
const MOVEMENT_MAP = {
  0: [ 0, -1],
  1: [ 1,  0],
  2: [ 0,  1],
  3: [-1,  0],
}

const addPos = ([x1, y1], [x2, y2]) => {
  return [x1 + x2, y1 + y2];
}
const mulPos = (n, [x, y]) => {
  return [n * x, n * y];
};

const visited = {
  '0.0': true,
};

let dir = START_DIR;
let currentPos = START_POS;
let revisitDone = false;
inputs.forEach((command) => {
  if (command[0] === 'R') {
    dir += 1;
  } else {
    dir -= 1;
  }

  if (dir < 0) {
    dir = 3;
  }
  dir = dir % 4;

  const num = parseInt(command.substr(1));
  const mov = MOVEMENT_MAP[dir];
  for (let i = 0; i < num; i += 1) {
    currentPos = addPos(currentPos, mov);
    if (visited[`${currentPos[0]}.${currentPos[1]}`] && !revisitDone) {
      console.log('First revisit at', currentPos, Math.abs(currentPos[0]) + Math.abs(currentPos[1]));
      revisitDone = true;
    }

    visited[`${currentPos[0]}.${currentPos[1]}`] = true;
  }


});

console.log(Math.abs(currentPos[0]) + Math.abs(currentPos[1]));
