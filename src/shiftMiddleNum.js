export function shiftMiddleNum(texts, regex, shiftNum, min, max) {
  return texts.map((text) => {
    return text.replace(regex, (wholeMatch, preStr, midNum, postStr) => {
      midNum = Number(midNum);

      if ((! max || midNum <= max) && (! min || midNum >= min)) {
        let newMidNum = midNum + shiftNum;
        return preStr + String(newMidNum) + postStr;
      }
      else {
        return wholeMatch;
      }
    });
  });
};