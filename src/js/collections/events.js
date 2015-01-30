define([
  "models/event",
  "services/events_cache",
  "collections/basecamp_notifier_collection"
], function(
  Event,
  EventsCache,
  BasecampNotifierCollection
) {
  return BasecampNotifierCollection.extend({
    model: Event,

    // default page
    page: 1,

    initialize: function(models, options) {
      this.accountId = options.accountId;
      BasecampNotifierCollection.prototype.initialize.apply(this, arguments);
    },

    urlRoot: function () {
      return "https://basecamp.com/" + this.accountId + "/api/v1/events.json";
    },

    url: function () {
      if (!this.modifiedSince) {
        return this.urlRoot();
      } else {
        return this.urlRoot() + "?since=" + this.modifiedSince;
      }
    },

    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
    },

    fetchNextPage: function () {
      var that = this;
      var promise = this.fetch({
        remove: false,
        data: { page: this.page }
      });

      promise.done(function () {
        that.page += 1;
      });

      return promise;
    },

    startStream: function () {
      var that = this;

      var fetchEvents = function () {
        if (that.models[0]) {
          that.modifiedSince = that.models[0].get("created_at");
        }

        that.fetch({ update: true, timeout: 50000, fetchOnlyNewRecords: true });
      };
      fetchEvents();

      this.stream = setInterval(fetchEvents, 60 * 1000);
    },

    updateCache: function () {
      EventsCache.update(this.urlRoot(), this.toJSON());
    },

    fetchCached: function () {
      var that = this;
      var cached = EventsCache.get(this.urlRoot());
      var promise = $.Deferred();

      this.set(this.parse(cached));

      promise.resolve(this);

      promise.done(function () {
        that.trigger("sync");
      });

      return promise.promise();
    },

    stopStream: function() {
      clearInterval(this.stream);
    }
  });
});
