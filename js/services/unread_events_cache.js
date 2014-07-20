define(["underscore"], function() {
  module = {};

  var persistCache = function(idsArray) {
    localStorage.setItem("unreadEvents", JSON.stringify(idsArray));
    chrome.extension.getBackgroundPage().unreadEventsCache = idsArray;
  };

  module.unreadItems = function() {
    if (!chrome.extension.getBackgroundPage().unreadEventsCache) {
      var persisted = localStorage.getItem("unreadEvents");
      return (persisted) ? JSON.parse(persisted) : [];
    } else {
      return chrome.extension.getBackgroundPage().unreadEventsCache;
    }
  };

  module.unredItemsCount = function () {
    return this.unreadItems().length;
  };

  module.isUnread = function (item) {
    return _.contains(this.unreadItems(), item.getId());
  };

  module.markAsRead = function(item) {
    var item = (_.isArray(item)) ? item : [item.getId()];
    persistCache(_.difference(this.unreadItems(), item));
  };

  module.addItem = function(eventItem) {
    persistCache(_.union(this.unreadItems(), [eventItem.getId()]));
  };

  module.clear = function() {
    persistCache([]);
  };

  return module;
});
