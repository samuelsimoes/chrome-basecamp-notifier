define([
  "services/array_local_storage",
  "services/event_desktop_notification",
  "services/object_local_storage",
  "services/desktop_notification",
  "services/badge"
], function(
  ArrayLocalStorage,
  EventDesktopNotification,
  ObjectLocalStorage,
  DesktopNotification,
  Badge
) {
  var MAX_DESKTOP_NOTIFICATIONS = 5;

  return function(accountID, eventsData) {
    Badge.add(eventsData.length);

    eventsData.forEach(function(eventData) {
      ArrayLocalStorage.add("unreadEvents", eventData.id);
    });

    if (ObjectLocalStorage.getItem("miscConfigs", "disable_desktop_notifications")) {
      return;
    }

    var firstEvents = eventsData.slice(0, MAX_DESKTOP_NOTIFICATIONS);

    firstEvents.forEach(function(eventData) {
      EventDesktopNotification.notify(eventData);
    });

    var nonNotifiedEventsCount = (eventsData.length - MAX_DESKTOP_NOTIFICATIONS);

    if (eventsData.length > MAX_DESKTOP_NOTIFICATIONS) {
      DesktopNotification({
        title: "Basecamp Notifier",
        message: ("And more " + nonNotifiedEventsCount + " event(s)."),
        iconUrl: "img/icons/64.png"
      });
    }
  }
});
