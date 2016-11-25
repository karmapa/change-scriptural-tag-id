import Fs from 'fs';
import Path from 'path';
import Glob from 'glob';

module.exports = function(textPath) {
  return Glob.sync(textPath + '/**/*.*(txt|xml)')
    .map((route) => {
      let fileName = Path.basename(route);
      let text = Fs.readFileSync(route, 'utf8');
      return {
        'fileName': fileName,
        'text': text
      }
    });
};