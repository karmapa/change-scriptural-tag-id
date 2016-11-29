const sutraBampoRegex = /(<sutra id=[^>]+?>|<bampo n=[^>]+?>)/g;
const sutraRegex = /<sutra id="[0-9a-zA-Z]+?(\d+)[^\d>]*"\/>/;
const preBampoTag = '<bampo n="', postBampoTag = '"/>';

export function syncBampoAndSutra(texts) {
  let sutraId, bampoN;

  texts.forEach((text) => {
    let sbMixTags = text.match(sutraBampoRegexBampo);
 
    sbMixTags.forEach((sbTag) => {
      let isSutraTag = sbTag.match(sutraRegex);

      if (isSutraTag) {
        sutraId = isSutraTag[1];
        bampoN = 1;
      }
      else if (sutraId) {
        let newBampoN = sutraId + '\.' + bampoN;
        let newBampoTag = preBampoTag + newBampoN + postBampoTag;
        text = text.replace(sbTag, newBampoTag);
        bampoN++;
      }
      else {
        console.log('there is no sutra tag before', sbTag, ', so this tag won\'t be rename');
      }
    });
  });
};