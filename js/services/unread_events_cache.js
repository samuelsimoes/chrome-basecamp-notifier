define(["underscore"], function() {
  module = {};

  var persistCache = function(idsArray) {
    localStorage.setItem("unreadEvents", JSON.stringify(idsArray));
  };

  module.unreadItems = function() {
    return JSON.parse(localStorage.getItem("unreadEvents")) || [];
  };

  module.markAsRead = function(item) {
    var item = (_.isArray(item)) ? item : [item];
    persistCache(_.difference(module.unreadItems, item));
  };

  module.addItem = function(id) {
    persistCache(_.union(module.unreadItems(), [id]));
  };

  return module;
});
