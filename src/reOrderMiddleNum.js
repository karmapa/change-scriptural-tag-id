export function reOrderMiddleNum(texts, regex, keyNum, floor, roof) {
  return texts.map((text) => {
    return text.replace(regex, (wholeMatch, preStr, midNum, postStr) => {
      midNum = Number(midNum);

      if ((! floor || midNum > floor) && (! roof || midNum < roof)) {
        midNum = keyNum;
        keyNum++;
        return preStr + String(midNum) + postStr;
      }
      else {
        return wholeMatch;
      }
    });
  });
};