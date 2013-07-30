define(["underscore"], function() {
  module = {};

  var persistCache = function(idsArray) {
    localStorage.setItem("unreadEvents", JSON.stringify(idsArray));
    window.unreadItemsCache = idsArray;
  };

  module.unreadItems = function() {
    if (window.unreadItemsCache == undefined) {
      window.unreadItemsCache = JSON.parse(localStorage.getItem("unreadEvents")) || [];
    }
    return window.unreadItemsCache;
  };

  module.markAsRead = function(item) {
    var item = (_.isArray(item)) ? item : [item];
    persistCache(_.difference(module.unreadItems(), item));
  };

  module.addItem = function(id) {
    persistCache(_.union(module.unreadItems(), [id]));
  };

  return module;
});
