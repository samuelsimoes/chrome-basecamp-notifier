define([
  "services/text",
], function(
  Text
) {
  var module = {};

  module.avatarUrl = function() {
    return this.eventItem.creator.avatar_url;
  };

  module.popUpWindow = function() {
    return this.eventItem.creator.name + " in " + this.eventItem.bucket.name;
  };

  module.popUpSummary = function() {
    var treatedSummary = Text.stripTags(this.eventItem.summary);
    treatedSummary = Text.unescapeHTML(treatedSummary);
    return Text.capitalize(treatedSummary);
  };

  module.itemUrl = function() {
    return this.eventItem.html_url;
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
