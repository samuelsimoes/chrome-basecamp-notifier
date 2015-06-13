define([
  "services/array_local_storage",
  "services/event_desktop_notification",
  "services/object_local_storage",
  "services/badge"
], function(
  ArrayLocalStorage,
  EventDesktopNotification,
  ObjectLocalStorage,
  Badge
) {
  var MAX_DESKTOP_NOTIFICATIONS = 5;

  return function(accountID, eventsData) {
    Badge.add(eventsData.length);

    eventsData.forEach(function(eventData) {
      ArrayLocalStorage.add("unreadEventsIDs", eventData.id);
    });

    if (ObjectLocalStorage.getItem("miscConfigs", "disable_desktop_notifications")) {
      return;
    }

    var firstEvents = eventsData.slice(0, MAX_DESKTOP_NOTIFICATIONS);

    firstEvents.forEach(function(eventData) {
      EventDesktopNotification.notify(eventData);
    });
  }
});
