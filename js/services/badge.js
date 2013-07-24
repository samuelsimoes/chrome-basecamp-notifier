define([
  "services/unread_events_cache"
], function(UnreadEventsCache) {

  var module = {};

  var text = function() {
    var unreadItems = UnreadEventsCache.unreadItems().length;
    return (unreadItems == 0) ? "" : unreadItems.toString();
  };

  module.update = function() {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0044a9" });

    chrome.browserAction.setBadgeText({
      text: text()
    });
  };

  return module;

});
