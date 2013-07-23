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

  return module;

});
