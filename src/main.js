const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNum = Number(process.argv[3]);
const shiftSetting = process.argv[4];

import {getTextAndNames, writeFiles} from './processFile.js';
import {getShiftRange} from './getShiftRange.js';
import {shiftSutraId} from './shiftSutraId.js';

let textsAndNames = getTextAndNames(oldTextPath);
let texts = textsAndNames.texts;
let fileNames = textsAndNames.fileNames;
let newTexts = shiftTagId(texts, shiftSetting, tagClass, shiftNum);
writeFiles(newTexts, fileNames, newTextPath);

function shiftTagId(texts, shiftSetting, tagClass, shiftNum) {
  let shiftRange = getShiftRange(shiftSetting);
  let start = shiftRange.start;
  let end = shiftRange.end;

  switch (tagClass) {
    case 'sutra':
      return shiftSutraId(texts, shiftNum, start, end);
  }
}