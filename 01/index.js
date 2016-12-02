const fs = require('fs');

const input = fs.readFileSync(`${ __dirname }/input`).toString().split(', ');

let dir = 0;
//             N  E  S  W
const steps = [0, 0, 0, 0];

input.forEach((command) => {
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
  steps[dir] += num;

  console.log('dir', dir, num);

  // process.exit(1);
});

console.log('in', steps);

const y = steps[0] - steps[2];
const x = steps[1] - steps[3];

console.log(Math.abs(x) + Math.abs(y));









//      000000
//      0    0
//      0    0
//      0    0
//      0
// x00000
//
// [5, 10, 3, 0]
//
//
// 2 + 10
