const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const shiftNum = Number(process.argv[3]);
const shiftSetting = process.argv[4];
const sutraRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;
const bampoRegex = /(<bampo n=")(\d+)([a-zA-Z]*\.[^>]+?"\/>)/g;

import {getTextAndNames, writeFiles} from './processFile.js';
import {getShiftRange} from './getShiftRange.js';
import {shiftMiddleNum} from './shiftMiddleNum.js';

let textsAndNames = getTextAndNames(oldTextPath);
let texts = textsAndNames.texts;
let fileNames = textsAndNames.fileNames;

let newTexts = shiftTagId(texts, shiftSetting, tagClass, shiftNum);

if (newTexts) {
  writeFiles(newTexts, fileNames, newTextPath);
}

function shiftTagId(texts, shiftSetting, tagClass, shiftNum) {
  let shiftRange = getShiftRange(shiftSetting);
  let start = shiftRange.start;
  let end = shiftRange.end;

  switch (tagClass) {
    case 'shift-sutra':
      return shiftMiddleNum(texts, sutraRegex, shiftNum, start, end);
    case 'shift-bampo':
      return shiftMiddleNum(texts, bampoRegex, shiftNum, start, end);
    case 'reorder-sutra':
      return;
    case 'reorder-bampo':
      return;
    default:
      console.log('should match following command');
      console.log('node index.js shift-[sutra, bampo] [shift number] [grq,lsq]');
      console.log('node index.js reorder-[sutra, bampo] [first number] [gre,lss]');
      break;
  }
}