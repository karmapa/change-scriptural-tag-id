const argvs = process.argv.slice(2);
const sutraActionRegex = /^(shift|reorder|rename)-sutra$/;
const bampoActionRegex = /^--bampo$/;
const rangeRegex = /^\d*?,\d*?$/;
const keyNumRegex = /^\d+$/;
const sutraIdRegex = /^[0-9a-zA-Z]+?\d+[^\d>]*$/;
const regexs = [sutraActionRegex, bampoActionRegex, rangeRegex, keyNumRegex, sutraIdRegex];

let args = getConstsFromArgv();

export let sutraAction = args.sutraAction;
export let bampoAction = args.bampoAction;
export let rangeSetting = args.rangeSetting;
export let keyNum = args.keyNum;
export let firstSutraId = args.firstSutraId;

function getConstsFromArgv() {
  let result = {};
  let propNames = ['sutraAction', 'bampoAction', 'rangeSetting', 'keyNum', 'firstSutraId'];

  propNames.forEach((propName, i) => {
    let regex = regexs[i];
    result[propName] = findElement(argvs, regex);
  });

  argvsErrorHandle(result);

  return result;
}

function findElement(arr, regex) {
  let found;
  arr.forEach((element) => {
    if (regex.test(element)) {
      found = element;
    }
  });
  return found;
}

function argvsErrorHandle(result) {
  const errMessages = [
    'should match following command',
    'node index.js shift-sutra [--bampo] [shift number] [grq,lsq]',
    'node index.js reorder-sutra [--bampo] [first number] [gre,lss]',
    'node index.js rename-sutra [--bampo] [first sutraId]',
    'node index.js --bampo'
  ];

  if (! result.sutraAction && ! result.bampoAction) {
    throw new Error(errMessages.join('\n'));
  }

  if ('rename-sutra' === result.sutraAction && ! result.firstSutraId) {
    throw new Error(errMessages[0] + '\n' + errMessages[3]);
  }

  if ('shift-sutra' === result.sutraAction && ! result.keyNum) {
    throw new Error(errMessages[0] + '\n' + errMessages[1]);
  }
}