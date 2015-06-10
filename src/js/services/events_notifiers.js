define([
  "services/array_local_storage",
  "services/desktop_notifier",
  "services/object_local_storage",
  "services/badge"
], function(
  ArrayLocalStorage,
  DesktopNotifier,
  ObjectLocalStorage,
  Badge
) {
  return function(accountID, eventsData) {
    Badge.add(eventsData.length);

    eventsData.forEach(function(eventData) {
      ArrayLocalStorage.add("unreadEventsIDs", eventData.id);
    });

    if (ObjectLocalStorage.getItem("miscConfigs", "disable_desktop_notifications")) {
      return;
    }

    eventsData.forEach(function(eventData) {
      DesktopNotifier.notify(eventData);
    });
  }
});
