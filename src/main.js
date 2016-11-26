const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const keyNum = Number(process.argv[3]);
const rangeSetting = process.argv[4];
const sutraRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;
const bampoRegex = /(<bampo n=")(\d+)([a-zA-Z]*\.[^>]+?"\/>)/g;

import {getTextAndNames, writeFiles} from './processFile.js';
import {getRange} from './getRange.js';
import {shiftMiddleNum} from './shiftMiddleNum.js';
import {reorderMiddleNum} from './reorderMiddleNum.js'; 

let textsAndNames = getTextAndNames(oldTextPath);
let texts = textsAndNames.texts;
let fileNames = textsAndNames.fileNames;

let newTexts = shiftTagId(texts, rangeSetting, tagClass, keyNum);

if (newTexts) {
  writeFiles(newTexts, fileNames, newTextPath);
}

function shiftTagId(texts, rangeSetting, tagClass, keyNum) {
  let range = getRange(rangeSetting);
  let start = range.start;
  let end = range.end;

  switch (tagClass) {
    case 'shift-sutra':
      return shiftMiddleNum(texts, sutraRegex, keyNum, start, end);
    case 'shift-bampo':
      return shiftMiddleNum(texts, bampoRegex, keyNum, start, end);
    case 'reorder-sutra':
      return reorderMiddleNum(texts, sutraRegex, keyNum, start, end);
    case 'reorder-bampo':
      return reorderMiddleNum(texts, bampoRegex, keyNum, start, end);
    default:
      console.log('should match following command');
      console.log('node index.js shift-[sutra, bampo] [shift number] [grq,lsq]');
      console.log('node index.js reorder-[sutra, bampo] [first number] [gre,lss]');
      break;
  }
}