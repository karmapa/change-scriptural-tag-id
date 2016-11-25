const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNum = Number(process.argv[3]);
const shiftSetting = process.argv[4];

import {GetTextAndNames, WriteFiles} from './processFile.js';
import GetShiftRange from './getShiftRange.js';
import ShiftSutraId from './shiftSutraId.js';

let textsAndNames = GetTextAndNames(oldTextPath);
//let newTextObjs = mainProcess(textObjs, shiftSetting, tagClass, shiftNum);


/*function mainProcess(textObjs, shiftSetting, tagClass, shiftNum) {
  let shiftRange = GetShiftRange(shiftSetting);
  let start = shiftRange.start;
  let end = shiftRange.end;

  switch (tagClass) {
    case 'sutra':
      return ShiftSutraId(textObjs, shiftNum, start, end);
  }
}*/