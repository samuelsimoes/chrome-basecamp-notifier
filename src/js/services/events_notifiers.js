define([
  "services/desktop_notifier",
  "services/events_filter",
  "services/badge"
], function(
  DesktopNotifier,
  EventsFilter,
  Badge
) {
  return function(eventsData) {
    var filteredItems = EventsFilter(eventsData);

    Badge.add(filteredItems.length);

    _.each(filteredItems, function(eventData) {
      DesktopNotifier.notify(eventData);
    });
  }
});
