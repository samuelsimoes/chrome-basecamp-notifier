define([
  "services/text",
], function(
  Text
) {
  var module = {};

  module.avatarUrl = function() {
    return this.eventItem.creatorAvatarUrl();
  };

  module.popUpWindow = function() {
    return this.eventItem.creatorName() + " in " + this.eventItem.bucketName();
  };

  module.popUpSummary = function() {
    var treatedSummary = Text.stripTags(this.eventItem.summary());
    treatedSummary = Text.unescapeHTML(treatedSummary);
    return Text.capitalize(treatedSummary);
  };

  module.itemUrl = function() {
    return this.eventItem.link();
  };

  module.notification = function() {
    var that = this;
    var bubble = webkitNotifications.createNotification(
      this.avatarUrl(),
      this.popUpSummary(),
      this.popUpWindow()
    );

    bubble.ondisplay = function(event) {
        setTimeout(function() {
          event.currentTarget.cancel();
      }, 5 * 1000);
    };

    bubble.onclick = function(event) {
      chrome.tabs.create({ url: that.itemUrl() });
      event.currentTarget.cancel();
    };

    return bubble;
  };

  module.notify = function (eventItem) {
    this.eventItem = eventItem;
    this.notification().show();
  };

  return module;
});
