define(["underscore"], function() {
  module = {};

  var persistCache = function(idsArray) {
    localStorage.setItem("unreadEvents", JSON.stringify(idsArray));
    chrome.extension.getBackgroundPage().unreadEventsCache = idsArray;
  };

  module.unreadItems = function() {
    if (chrome.extension.getBackgroundPage().unreadEventsCache==undefined) {
      var persisted = localStorage.getItem("unreadEvents");
      return (persisted) ? JSON.parse(persisted) : [];
    } else {
      return chrome.extension.getBackgroundPage().unreadEventsCache;
    }
  };

  module.markAsRead = function(item) {
    var item = (_.isArray(item)) ? item : [item];
    persistCache(_.difference(module.unreadItems(), item));
  };

  module.addItem = function(id) {
    persistCache(_.union(module.unreadItems(), [id]));
  };

  module.clear = function() {
    persistCache([]);
  };

  return module;
});
