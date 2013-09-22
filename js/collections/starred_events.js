define([
  "collections/events",
  "services/events_cache",
  "backbone"
], function(
  Events,
  EventsCache
) {
  return Events.extend({

    addEvent: function (eventItem) {
      this.add(eventItem);
      EventsCache.update("starred-items-" + this.account.getId(), this.toJSON());
    },

    removeEvent: function (eventItem) {
      this.remove(eventItem);
      EventsCache.update("starred-items-" + this.account.getId(), this.toJSON(), true);
    },

    fetch: function () {
      var promise = $.Deferred();

      var storedItems = EventsCache.get("starred-items-" + this.account.getId());

      this.set(storedItems);

      promise.resolve(this);

      return promise;
    }
  });
});
