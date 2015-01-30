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
      EventsCache.update("starred-items-" + this.accountId, this.toJSON());
    },

    removeEvent: function (eventItem) {
      this.remove(eventItem);
      EventsCache.update("starred-items-" + this.accountId, this.toJSON(), true);
    },

    fetch: function () {
      var promise = $.Deferred();
      var storedItems = EventsCache.get("starred-items-" + this.accountId);
      var that = this;

      this.set(storedItems);

      promise.resolve(this);

      promise.done(function () {
        that.trigger("sync");
      });

      return promise;
    }
  });
});
