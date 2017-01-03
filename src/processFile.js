import fs from 'fs';
import dealPath from 'path';
import glob from 'glob';
import naturalSort from 'javascript-natural-sort';

function getTextAndRoutes(textPath, newTextPath) {
  let fileRoutes = [], texts = [];

  glob.sync(textPath + '/**/*.*(txt|xml)')
    .sort(naturalSort)
    .forEach((route) => {
      let newRoute = route.replace(textPath, newTextPath);
      let newDir = dealPath.dirname(newRoute);
      mkDeepDir(newDir);
      fileRoutes.push(newRoute);
      texts.push(fs.readFileSync(route, 'utf8'));
    });

  return {
    'fileRoutes': fileRoutes,
    'texts': texts
  };
}

function mkDeepDir(dir) {
  try {
    fs.mkdirSync(dir + '/');
  }
  catch (err) {
    if (/no such file or directory/.test(err.message)) {
      let shallowerPath = dealPath.dirname(dir);
      mkDeepDir(shallowerPath);
      mkDeepDir(dir);
    }
  }
}

function writeFiles(texts, routes) {
  texts.forEach((text, i) => {
    let fileRoute = routes[i];
    fs.writeFileSync(fileRoute, text, 'utf8');
  });
}

export {getTextAndRoutes, writeFiles};