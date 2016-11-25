import Fs from 'fs';
import Path from 'path';
import Glob from 'glob';

function getTexts(textPath) {
  return Glob.sync(textPath + '/**/*.*(txt|xml)')
    .map((route) => {
      let fileName = Path.basename(route);
      let text = Fs.readFileSync(route, 'utf8');
      return {
        'fileName': fileName,
        'text': text
      }
    });
}

module.exports = getTexts;