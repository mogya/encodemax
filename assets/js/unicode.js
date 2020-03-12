function from_unicode_escaped(str){
  // https://stackoverflow.com/questions/7885096/how-do-i-decode-a-string-with-escaped-unicode
  return unescape(JSON.parse(`"${str}"`));
};

function to_unicode_escaped(str){
  // https://gist.github.com/mathiasbynens/1243213#gistcomment-1920263
  return str.replace(/[^\0-~]/g, function(ch) {
      return "\\u" + ("000" + ch.charCodeAt().toString(16)).slice(-4);
  });
}

export default { from_unicode_escaped, to_unicode_escaped}
