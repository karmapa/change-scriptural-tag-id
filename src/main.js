const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNumber = Number(process.argv[3]);
const shiftRange = process.argv[4];
let shiftStart, shiftEnd;

if (shiftRange) {
  shiftStart = shiftRange.split(',')[0];
  shiftEnd = shiftRange.split(',')[1];
}

import GetTexts from './getTexts.js';
import ShiftSutraId from './shiftSutraId.js';

let texts = GetTexts(oldTextPath);
let newTexts;

switch (tagClass) {
  case 'sutra':
    ShiftSutraId(texts);
    break;
}