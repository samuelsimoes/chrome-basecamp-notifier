define([], function() {
  var module = {};

  var text = function(number) {
    return (!number) ? "" : number.toString();
  };

  module.render = function() {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0044a9" });
    chrome.browserAction.setBadgeText({ text: text(this.currentUnreadCount()) });
  };

  module.update = function(number) {
    window.localStorage.setItem("currentUnreadEventCount", number);
    module.render();
  };

  module.currentUnreadCount = function() {
    return (parseInt(window.localStorage.getItem("currentUnreadEventCount"), 10) || 0);
  },

  module.add = function(number) {
    var currentUnreadEventCount = this.currentUnreadCount();

    var newCount = (number + currentUnreadEventCount);

    module.update(newCount);
  };

  return module;
});
