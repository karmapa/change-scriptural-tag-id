const sutraBampoRegex = /(<sutra id=[^>]+?>|<bampo n=[^>]+?>)/g;
const sutraRegex = /<sutra id="[0-9a-zA-Z]+?(\d+[^\d>]*)"\/>/;
const bampoTagRegex = /<bampo n="[^>]*"\/>/g;
const preBampoTag = '<bampo n="', postBampoTag = '"/>';

export function syncBampoAndSutra(texts) {
  let sutraId, bampoN;

  return texts.map((text) => {
    let sbMixTags = text.match(sutraBampoRegex) || [];
    let newBampoTags = [];

    sbMixTags.forEach((sbTag) => {
      let isSutraTag = sbTag.match(sutraRegex);

      if (isSutraTag) {
        sutraId = isSutraTag[1];
        bampoN = 1;
      }
      else if (sutraId) {
        newBampoTags.push(makeNewBampoTag(sbTag, sutraId, bampoN));
        bampoN++;
      }
      else {
        newBampoTags.push(sbTag);
        console.log('there is no sutra tag before', sbTag, ', so this tag won\'t be renamed');
      }
    });

    return replaceOldBampos(text, newBampoTags);
  });
};

function makeNewBampoTag(originalBampoTag, sutraId, bampoN) {
  let newBampoN = sutraId + '\.' + bampoN;
  return originalBampoTag.replace(/n="([^"])"/, function(m) {
    return 'n="' + newBampoN + '"';
  });
}

function replaceOldBampos(text, newBampos) {
  let index = -1;
  return text.replace(bampoTagRegex, () => {
    index++;
    return newBampos[index];
  });
}