define([
  "services/configs_ignored_events",
  "services/configs_ignored_projects",
  "services/event_type",
  "models/user",
  "underscore"
], function(
  ConfigIgnoredEvents,
  ConfigIgnoredProjects,
  EventType,
  User
) {
  return function(events) {
    return _.filter(events, function(eventItem) {
      var conditionsToRemove = [
        (eventItem.creator.name === User.current().fullName()),
        _.include(ConfigIgnoredProjects.ignoredProjectsIds(), eventItem.bucket.id),
        _.include(ConfigIgnoredEvents.ignoredEvents(), EventType.discover(eventItem.action))
      ];

      return !_.any(conditionsToRemove);
    });
  };
});
