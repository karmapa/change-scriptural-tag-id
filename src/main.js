const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const sutraNumRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;
const sutraNameRegex = /(<sutra id=")([^>]*?)("\/>)/g;

import {sutraAction, bampoAction, rangeSetting, keyNum, firstSutraId} from './processArgv.js'
import {getTextAndNames, writeFiles} from './processFile.js';
import {getRange} from './getRange.js';
//import {shiftMiddleNum} from './shiftMiddleNum.js';
//import {reOrderMiddleNum} from './reOrderMiddleNum.js'; 
//import (renameSutra) from './renameSutra.js';
//import {syncBampoAndSutra} from './syncBampoAndSutra.js';

let textsAndNames = getTextAndNames(oldTextPath);
let texts = textsAndNames.texts;
let fileNames = textsAndNames.fileNames;

//let newTexts = changeTagId(texts);

/*if (newTexts) {
  writeFiles(newTexts, fileNames, newTextPath);
}*/
/*
function changeTagId(texts) {
  let range = getRange(rangeSetting);
  let start = range.start;
  let end = range.end;

  if (! isNaN(Number(keyNum))) {
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
    }
  }
}*/