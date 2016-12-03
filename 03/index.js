const fs = require('fs');
const RAW_INPUT = fs.readFileSync(`${ __dirname }/input`).toString();
const INPUT_ROWS = RAW_INPUT.split('\n').slice(0, -1);

const trianglesByRow = INPUT_ROWS
  .map((row) => {
    return row
      .split(' ')
      .filter((part) => part)
      .map((part) => part.trim())
      .map((part) => parseInt(part));
  });

const numbers = INPUT_ROWS
  .reduce((prev, row) => {
    return prev.concat(row.split(' ').filter((part) => part).map((part) => parseInt(part)));
  }, [])
const trianglesByCol = [];
console.log('numb', numbers.length);
for (let i = 0; i <= (numbers.length - 9); i += 9) {
  console.log('i', i);
  for (let j = 0; j < 3; j += 1) {
    trianglesByCol.push([
      numbers[i + j + 3 * 0],
      numbers[i + j + 3 * 1],
      numbers[i + j + 3 * 2],
    ]);
  }
}

// console.log('trianglesByCol', trianglesByCol);

const isValidTriangle = ([a, b, c]) => {
  if (a + b <= c) {
    return false;
  }
  if (a + c <= b) {
    return false;
  }
  if (b + c <= a) {
    return false;
  }

  return true;
}


const validtriangles1 = trianglesByRow.filter((triangle) => isValidTriangle(triangle)).length;
const validtriangles2 = trianglesByCol.filter((triangle) => isValidTriangle(triangle)).length;

console.log('Valid by row:', validtriangles1);
console.log('Valid by col:', validtriangles2);
