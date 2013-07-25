define([], function() {

  var module = {};

  // C'mon Basecamp...
  module.removeSpanTags = function(text) {
    var text = text.replace("<span>", "");
    return text.replace("</span>", "");
  };

  module.capitalize = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  module.truncate = function(str, maxLength, suffix)  {
      if(str.length > maxLength) {
          str = str.substring(0, maxLength + 1);
          str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
          str = str + suffix;
      }
      return str;
  };

  module.contains = function(str, needle) {
    if (needle === '') return true;
    if (str == null) return false;
    return String(str).indexOf(needle) !== -1;
  };

  return module;

});
