define(["underscore"], function(_) {
  return function(options, onClick) {
    var notificationID = Math.random().toString().substring(2, 8);

    _.defaults(options, { type: "basic" });

    var notification =
      chrome.notifications.create(notificationID, options, function() {});

    chrome.notifications.onClicked.addListener(function(clickedNotificationId) {
      if (clickedNotificationId !== notificationID) { return; }
      onClick();
    });
  };
});
