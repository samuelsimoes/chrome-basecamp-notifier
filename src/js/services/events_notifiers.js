import ArrayLocalStorage from "services/array_local_storage";
import EventDesktopNotification from "services/event_desktop_notification";
import ObjectLocalStorage from "services/object_local_storage";
import DesktopNotification from "services/desktop_notification";
import Badge from "services/badge";

var MAX_DESKTOP_NOTIFICATIONS = 5;

export default function(accountID, eventsData) {
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
};
