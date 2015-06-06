define([
  "services/configs_ignored_events",
  "services/configs_ignored_projects",
  "services/event_type",
  "services/user"
], function(
  ConfigIgnoredEvents,
  ConfigIgnoredProjects,
  EventType,
  User
) {
  return function(events) {
    return events.filter(function(eventItem) {
      var conditionsToRemove = [
        (eventItem.creator.id === User.currentUserID()),
        ConfigIgnoredProjects.isIgnored(eventItem.bucket.id),
        ConfigIgnoredEvents.isIgnored(EventType.discover(eventItem.action))
      ];

      return conditionsToRemove.every(function(condition) {
        return !condition;
      });
    });
  };
});
