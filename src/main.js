const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNum = Number(process.argv[3]);
const shiftSetting = process.argv[4];

import GetTexts from './getTexts.js';
import GetShiftRange from './getShiftRange.js';
import ShiftSutraId from './shiftSutraId.js';

let texts = GetTexts(oldTextPath);
let newTexts;
let shiftRange = GetShiftRange(shiftSetting);

switch (tagClass) {
  case 'sutra':
    //newTexts = ShiftSutraId(texts, shiftNum, shiftStart, shiftEnd);
    break;
}