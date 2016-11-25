import Fs from 'fs';
import Path from 'path';
import Glob from 'glob';

function getTextAndNames(textPath) {
  let fileNames = [], texts = [];

  Glob.sync(textPath + '/**/*.*(txt|xml)')
    .forEach((route) => {
      fileNames.push(Path.basename(route));
      texts.push(Fs.readFileSync(route, 'utf8'));
    });

  return {
    'fileNames': fileNames,
    'text': texts
  };
}

function writeFiles(texts, names, path) {
  tests.forEach((text, i) => {
    let fileName = names[i];
    Fs.writeFileSync(path + '/' + fileName, text, 'utf8');
  });
}

export {
  getTextAndNames as GetTextAndNames,
  writeFiles as WriteFiles
}