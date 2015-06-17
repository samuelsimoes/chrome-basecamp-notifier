import ConfigsIgnoredEvents from "services/configs_ignored_events";
import ConfigsIgnoredProjects from "services/configs_ignored_projects.js";
import EventType from "services/event_type";
import User from "services/user";

export default function(accountID, events) {
  return events.filter(function(eventItem) {
    var conditionsToRemove = [
      (eventItem.creator.id === User.userIDOnAccount(accountID)),
      ConfigsIgnoredProjects.isIgnored(eventItem.bucket.id),
      ConfigsIgnoredEvents.isIgnored(EventType.discover(eventItem.action))
    ];

    return conditionsToRemove.every(function(condition) {
      return !condition;
    });
  });
};
