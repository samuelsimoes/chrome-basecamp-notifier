define([], function() {

  var module = {};

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  module.stripTags = function(str){
    if (str == null) return '';
    return String(str).replace(/<\/?[^>]+>/g, '');
  };

  module.unescapeHTML = function(str) {
    if (str == null) return '';
    return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
      var match;

      if (entityCode in escapeChars) {
        return escapeChars[entityCode];
      } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
        return String.fromCharCode(parseInt(match[1], 16));
      } else if (match = entityCode.match(/^#(\d+)$/)) {
        return String.fromCharCode(~~match[1]);
      } else {
        return entity;
      }
    });
  };

  module.capitalize = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  module.truncate = function(str, length, truncateStr)  {
    if (str == null) return '';
    str = String(str); truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
  };

  module.contains = function(str, needle) {
    if (needle === '') return true;
    if (str == null) return false;
    return String(str).indexOf(needle) !== -1;
  };

  return module;

});
