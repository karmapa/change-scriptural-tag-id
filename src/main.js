const oldTextPath = './old-texts';
const newTextPath = './new-pb-texts';
const sutraNumRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;
const sutraNameRegex = /(<sutra id=")([^>]*?)("\/>)/g;

import {sutraAction, bampoAction, rangeSetting, keyNum, firstSutraId} from './processArgv.js';
import {getTextAndRoutes, writeFiles} from './processFile.js';
import {getRange} from './getRange.js';
import {shiftMiddleNum} from './shiftMiddleNum.js';
import {reOrderMiddleNum} from './reOrderMiddleNum.js'; 
import {renameSutra} from './renameSutra.js';
import {syncBampoAndSutra} from './syncBampoAndSutra.js';

let textsAndRoutes = getTextAndRoutes(oldTextPath, newTextPath);

let texts = textsAndRoutes.texts;
let fileRoutes = textsAndRoutes.fileRoutes;

let newTexts = changeTagId(texts);

if (newTexts) {
  writeFiles(newTexts, fileRoutes);
}

function changeTagId(texts) {
  let range = getRange(rangeSetting);
  let start = range.start;
  let end = range.end;

  let resultTexts = changeSutraId(sutraAction);

  return bampoAction ? syncBampoAndSutra(resultTexts) : resultTexts;

  function changeSutraId(sutraAction) {
    switch (sutraAction) {
      case 'shift-sutra':
        let shiftNum = Number(keyNum);
        return shiftMiddleNum(texts, sutraNumRegex, shiftNum, start, end);
      case 'reorder-sutra':
        let firstNum = Number(keyNum);
        return reOrderMiddleNum(texts, sutraNumRegex, firstNum, start, end);
      case 'rename-sutra':
        return renameSutra(texts, sutraNameRegex, firstSutraId);
      default:
        return texts;
    }
  }
}

