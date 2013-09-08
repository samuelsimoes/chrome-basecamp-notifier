define([
  "services/unread_events_cache"
], function(UnreadEventsCache) {

  var module = {};

  var text = function(number) {
    return (number == 0 || number == undefined) ? "" : number.toString();
  };

  module.update = function(number) {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0044a9" });
    chrome.browserAction.setBadgeText({ text: text(number) });
  };

  return module;
});
