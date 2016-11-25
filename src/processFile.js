import fs from 'fs';
import dealPath from 'path';
import glob from 'glob';
import naturalSort from 'javascript-natural-sort';

function getTextAndNames(textPath) {
  let fileNames = [], texts = [];

  glob.sync(textPath + '/**/*.*(txt|xml)')
    .sort(naturalSort)
    .forEach((route) => {
      fileNames.push(dealPath.basename(route));
      texts.push(fs.readFileSync(route, 'utf8'));
    });

  return {
    'fileNames': fileNames,
    'texts': texts
  };
}

function writeFiles(texts, names, path) {
  texts.forEach((text, i) => {
    let fileName = names[i];
    fs.writeFileSync(path + '/' + fileName, text, 'utf8');
  });
}

export {getTextAndNames, writeFiles};