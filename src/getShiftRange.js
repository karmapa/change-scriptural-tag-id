export function getShiftRange(shiftSetting) {
  let startNum, endNum;

  if (shiftSetting) {
    let sets = shiftSetting.split(',')
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