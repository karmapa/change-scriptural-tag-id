const sutraRegex = /(<sutra id="[0-9a-zA-Z]+?)(\d+)([^\d>]*"\/>)/g;

import shiftMiddleNum from './shiftMiddleNum.js';

module.exports = function(textObjs, shiftNum, start, end) {
  textObjs.forEach((textObj) => {
    let text = textObj.text;
    textObj.text = shiftMiddleNum(text, sutraRegex, shiftNum, start, end);
  });

  return textObjs;
};