const sutraRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;

import {shiftMiddleNum} from './shiftMiddleNum.js';

export function shiftSutraId(texts, shiftNum, start, end) {
  return texts.map((text) => {
    return shiftMiddleNum(text, sutraRegex, shiftNum, start, end);
  });
};