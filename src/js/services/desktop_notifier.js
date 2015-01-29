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
        notificationId = Math.random().toString(36).substring(7);

    var notification =
      chrome.notifications.create(
        notificationId,
        {
          type: "basic",
          title: this.popUpSummary(),
          message: this.popUpWindow(),
          iconUrl: this.avatarUrl()
        },
        function() {});

    chrome.notifications.onClicked.addListener(function(clickedNotificationId) {
      if (clickedNotificationId == notificationId) {
        chrome.tabs.create({ url: that.itemUrl() });
      }
    });

    return notification;
  };

  module.notify = function (eventItem) {
    this.eventItem = eventItem;
    this.notification();
  };

  return module;
});
