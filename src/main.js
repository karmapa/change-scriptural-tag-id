const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const tagClass = process.argv[2];
const majorArg = process.argv[3];
const rangeSetting = process.argv[4];
const sutraNumRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;
const sutraNameRegex = /(<sutra id=")([^>]*?)("\/>)/g;

import {getTextAndNames, writeFiles} from './processFile.js';
import {getRange} from './getRange.js';
import {shiftMiddleNum} from './shiftMiddleNum.js';
import {reOrderMiddleNum} from './reOrderMiddleNum.js'; 
import (renameSutra) from './renameSutra.js';
import {syncBampoAndSutra} from './syncBampoAndSutra.js';

let textsAndNames = getTextAndNames(oldTextPath);
let texts = textsAndNames.texts;
let fileNames = textsAndNames.fileNames;

let newTexts = shiftTagId(texts, rangeSetting, tagClass, majorArg);

if (newTexts) {
  writeFiles(newTexts, fileNames, newTextPath);
}

function changeTagId(texts, rangeSetting, actionInput, majorArg) {
  let range = getRange(rangeSetting);
  let start = range.start;
  let end = range.end;
  let keyNum, firstSutraId;
  let actions = actionInput.split('--');
  let sutraAction = actions[0], bampoAction = actions[1];

  if (! isNaN(Number(majorArg))) {
    keyNum = Number(majorArg);
  }
  else {
    firstSutraId = majorArg;
  }

  let resultTexts = changeSutraId(sutraAction);

  return bampoAction ? syncBampoAndSutra(resultTexts) : resultTexts;

  function changeSutraId(sutraAction) {
    switch (sutraAction) {
      case 'shift-sutra':
        return shiftMiddleNum(texts, sutraNumRegex, keyNum, start, end);
      case 'reorder-sutra':
        return reOrderMiddleNum(texts, sutraNumRegex, keyNum, start, end);
      case 'rename-sutra':
        return renameSutra(texts, sutraNameRegex, firstSutraId);
      default:
        return texts;
        //console.log('should match following command');
        //console.log('node index.js shift-sutra [--bampo] [shift number] [grq,lsq]');
        //console.log('node index.js reorder-sutra [--bampo] [first number] [gre,lss]');
        //console.log('node index.js rename-sutra [--bampo] [first number]');
        //console.log('node index.js --bampo');
        break;
    }
  }
}