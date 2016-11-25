const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNum = Number(process.argv[3]);
const shiftSetting = process.argv[4];

import GetTextObjs from './getTextObjs.js';
import GetShiftRange from './getShiftRange.js';
import ShiftSutraId from './shiftSutraId.js';

mainProcess(oldTextPath, shiftSetting, tagClass, shiftNum);

function mainProcess(oldTextPath, shiftSetting, tagClass, shiftNum) {
  let textObjs = GetTextObjs(oldTextPath);
  let shiftRange = GetShiftRange(shiftSetting);
  let start = shiftRange.start;
  let end = shiftRange.end;

  switch (tagClass) {
    case 'sutra':
      return ShiftSutraId(textObjs, shiftNum, start, end);
  }
}