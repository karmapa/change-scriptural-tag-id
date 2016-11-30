const sutraIdLetterSuffix = /<sutra id="[0-9a-zA-Z]+?\d+[^\d>]+"\/>/g;

export function reOrderMiddleNum(texts, regex, keyNum, floor, roof) {
  let stopTag;

  let reOrderedTexts = texts.map((text) => {
    return text.replace(regex, (wholeMatch, preStr, midNum, postStr) => {
      let isLetterSuffix = wholeMatch.match(sutraIdLetterSuffix);
      midNum = Number(midNum);

      if ((! floor || midNum > floor) && (! roof || midNum < roof) && ! stopTag) {

        if (isLetterSuffix) {
          stopTag = wholeMatch;
          return wholeMatch;
        }

        midNum = keyNum;
        keyNum++;
        return preStr + String(midNum) + postStr;
      }
      else {
        return wholeMatch;
      }
    });
  });

  if (stopTag) {
    console.log('sutra-reorder stop at tag with letter suffix:', stopTag);
  }

  return reOrderedTexts;
};