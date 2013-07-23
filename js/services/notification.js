define([
  "services/text",
], function(Text) {

  var module = {};

  var avatarUrl = function() {
    return module.model.get("creator").avatar_url;
  };

  var popUpWindow = function() {
    return module.model.get("creator").name + " in " + module.model.get("bucket").name;
  };

  var popUpSummary = function() {
    return Text.removeSpanTags(Text.capitalize(module.model.get("summary")));
  };

  var itemUrl = function() {
    return module.model.get("html_url");
  };

  var notification = function() {

    var bubble = webkitNotifications.createNotification(
      avatarUrl(),
      popUpWindow(),
      popUpSummary()
    );

    bubble.ondisplay = function(event) {
        setTimeout(function() {
          event.currentTarget.cancel();
      }, 5 * 1000);
    };

    bubble.onclick = function(event) {
      chrome.tabs.create({ url: itemUrl() });
      event.currentTarget.cancel();
    };

    return bubble;
  };

  module.notify = function(model, account) {
    module.model = model;
    module.account = account;

    notification().show();
  };

  return module;
});
