export function getRange(rangeSetting) {
  let startNum, endNum;

  if (rangeSetting) {
    let sets = rangeSetting.split(',')
    let startStr = sets[0];
    let endStr = sets[1];

    startNum = '' !== startStr ? Number(startStr) : undefined;
    endNum = '' !== endStr ? Number(endStr) : undefined;
  }

  return {
    "start": startNum,
    "end": endNum
  }
};