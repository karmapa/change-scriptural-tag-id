const argvs = process.argv.slice(2);
const sutraActionRegex = /^(shift|reorder|rename)-sutra$/;
const bampoActionRegex = /^--bampo$/;
const rangeRegex = /^\d*?,\d*?$/;
const keyNumRegex = /^\d+$/;
const regexs = [sutraActionRegex, bampoActionRegex, rangeRegex, keyNumRegex];
const errMessages = [
  'should match following command',
  'node index.js shift-sutra [--bampo] [shift number] [grq,lsq]',
  'node index.js reorder-sutra [--bampo] [first number] [gre,lss]',
  'node index.js rename-sutra [--bampo] [first number]',
  'node index.js --bampo'
];

let args = getConstsFromArgv();

export let sutraAction = args.sutraAction;
export let bampoAction = args.bampoAction;
export let rangeSetting = args.rangeSetting;
export let keyNum = args.keyNum;

function getConstsFromArgv() {
  let result = {};
  let propNames = ['sutraAction', 'bampoAction', 'rangeSetting', 'keyNum'];

  propNames.forEach((propName, i) => {
    let regex = regexs[i];
    result[propName] = findElement(argvs, regex);
  });

  if (! result.sutraAction && ! result.bampoAction) {
    throw new Error(errMessages.join('\n'));
  }

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

