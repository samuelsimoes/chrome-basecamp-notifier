import { _ } from "libs";
import EventType from "services/event_type";
import ConfigsIgnoredEvents from "services/configs_ignored_events";

export default {
  initialize: function (ignoredEventsTypesStore) {
    this.ignoredEventsTypesStore = ignoredEventsTypesStore;
    this._load();
  },

  _load: function() {
    var eventsData = _.values(EventType.types);

    _.each(eventsData, function(item) {
      item.ignored = ConfigsIgnoredEvents.isIgnored(item.key);
    });

    this.ignoredEventsTypesStore.resetFromData(eventsData);
  },

  toggle: function(eventType) {
    var store = this.ignoredEventsTypesStore.findWhere({ key: eventType }),
        ignored = store.data.ignored;

    var cacheAction = ignored ? "remove" : "add";

    ConfigsIgnoredEvents[cacheAction](eventType);

    store.setAttribute("ignored", !ignored);
  }
};
