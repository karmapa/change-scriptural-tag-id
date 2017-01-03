import fs from 'fs';
import dealPath from 'path';
import glob from 'glob';
import naturalSort from 'javascript-natural-sort';

function getTextAndNames(textPath, newTextPath) {
  let fileNames = [], texts = [];

  glob.sync(textPath + '/**/*.*(txt|xml)')
    .sort(naturalSort)
    .forEach((route) => {
      let newRoute = route.replace(textPath, newTextPath);
      let newDir = dealPath.dirname(newRoute);
      mkDeepDir(newDir);
      fileNames.push(newRoute);
      texts.push(fs.readFileSync(route, 'utf8'));
    });

  return {
    'fileNames': fileNames,
    'texts': texts
  };
}

function mkDeepDir(dir) {
  fs.mkdir(dir + '/', (err) => {
    if (err) {
      if (/no such file or directory/.test(err.message)) {
        let shallowerPath = dealPath.dirname(dir);
        mkDeepDir(shallowerPath);
        mkDeepDir(dir);
      }
    }
  });
}

function writeFiles(texts, names) {
  texts.forEach((text, i) => {
    let fileName = names[i];
    fs.writeFileSync(fileName, text, 'utf8');
  });
}

export {getTextAndNames, writeFiles};