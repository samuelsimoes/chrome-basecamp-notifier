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
        // Sadly we can't use some ID checking here, which will be much more realible.
        // Basecamp sends on the "identity" field on the authorization endpoint a global
        // user ID, when on the event endpoint it sends the access ID.
        //
        // So, the last chance for us is to make this checking verifying the name of the creator
        // with the identity name.
        (eventItem.creator.name === User.currentUserName()),
        ConfigIgnoredProjects.isIgnored(eventItem.bucket.id),
        ConfigIgnoredEvents.isIgnored(EventType.discover(eventItem.action))
      ];

      return conditionsToRemove.every(function(condition) {
        return !condition;
      });
    });
  };
});
