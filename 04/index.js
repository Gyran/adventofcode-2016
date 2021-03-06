const fs = require('fs');
const RAW_INPUT = fs.readFileSync(`${ __dirname }/input`).toString();
const INPUT_ROWS = RAW_INPUT.split('\n').slice(0, -1);

const parseRoom = (row) => {
  const room = {
    names: [],
    sectorId: -1,
    checksum: '',
  };

  let currentPart = '';
  for (let i = 0; i < row.length; i += 1) {
    const token = row[i];

    if (token === '-') {
      room.names.push(currentPart);
      currentPart = '';
      continue;
    }

    if (token === '[') {
      room.sectorId = parseInt(currentPart, 10);
      currentPart = '';
      continue;
    }

    if (token === ']') {
      room.checksum = currentPart;
    }

    currentPart = `${ currentPart }${ token }`;
  }

  return room;
};

const isValidRoom = (room) => {
  const letterDist = {};

  room.names.forEach((name) => {
    name.split('').forEach((letter) => {
      if (!letterDist[letter]) {
        letterDist[letter] = 0;
      }
      letterDist[letter] += 1;
    });
  });

  const unsortedLetters = [];
  for (letter in letterDist) {
    if (letterDist.hasOwnProperty(letter)) {
      unsortedLetters.push({letter, count: letterDist[letter]});
    }
  }
  const sortedLetters = unsortedLetters.sort((a, b) => {
    const diff = b.count - a.count;

    if (diff === 0) {
      if (a.letter < b.letter) {
        return -1;
      }

      return 1;
    }
    return diff;
  });

  let valid = true;
  room.checksum.split('').forEach((c, i) => {
    if (sortedLetters[i].letter !== c) {
      valid = false;
    }
  });

  return valid;
};

const validRooms = INPUT_ROWS
  .map((row) => parseRoom(row))
  .filter((room) => isValidRoom(room));

const sectorIdSum = validRooms.reduce((sum, room) => {
  return sum + room.sectorId;
}, 0);

const LOWERCASE_A_CHAR_CODE = 97;
const ALPHABETH = 'abcdefghijklmnopqrstuvwxyz';
const dechiperRoom = (room) => {
  const shift = (room.sectorId % (ALPHABETH.length));

  const dNames = room.names.map((name) => {
    return name.split('').map((c) => {
      const encryptedNum = c.charCodeAt(0) - LOWERCASE_A_CHAR_CODE;
      const decruptedNum = (encryptedNum + shift) % (ALPHABETH.length);
      return String.fromCharCode(decruptedNum + LOWERCASE_A_CHAR_CODE);
      // console.log('e', encryptedNum, decruptedNum, String.fromCharCode(decruptedNum + LOWERCASE_A_CHAR_CODE));
    }).join('');
  });

  console.log('de name', room.sectorId, dNames);
};

validRooms.forEach((room) => {
  dechiperRoom(room);
});



// console.log('valid rooms', validRooms.length, 'sector sum', sectorIdSum);
