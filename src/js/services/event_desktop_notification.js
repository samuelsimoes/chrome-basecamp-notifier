define([
  "services/text",
  "services/desktop_notification"
], function(
  Text,
  DesktopNotification
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
    DesktopNotification({
      title: this.popUpSummary(),
      message: this.popUpWindow(),
      iconUrl: this.avatarUrl()
    }, function(itemURL) {
      chrome.tabs.create({ url: itemURL });
    }.bind(this, this.itemUrl()));
  };

  module.notify = function (eventItem) {
    this.eventItem = eventItem;
    this.notification();
  };

  return module;
});
