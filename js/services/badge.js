define([
  "services/unread_events_cache"
], function(UnreadEventsCache) {

  var module = {};

  module.update = function() {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0044a9" });

    chrome.browserAction.setBadgeText({
      text: UnreadEventsCache.unreadItems().length.toString()
    });
  };

  return module;

});
