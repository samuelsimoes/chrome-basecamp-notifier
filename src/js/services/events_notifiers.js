define([
  "services/desktop_notifier",
  "services/badge"
], function(
  DesktopNotifier,
  Badge
) {
  return function(eventsData) {
    Badge.add(eventsData.length);

    _.each(eventsData, function(eventData) {
      DesktopNotifier.notify(eventData);
    });
  }
});
