export function renameSutra(texts, regex, firstSutraId) {
  let sutraPrefix = firstSutraId.match(/.*[^\d]/)[0];
  let sutraNum = Number(firstSutraId.match(/\d+/g).pop());
  return texts.map((text) => {
    return text.replace(regex, (wholeTag, preStr, sutraId, postStr) => {
      let numStr = String(sutraNum);
      sutraNum++;
      return preStr + sutraPrefix + numStr + postStr;
    });
  });
};