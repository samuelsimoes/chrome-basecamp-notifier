define([
  "models/event",
  "services/events_cache",
  "services/http_cache"
], function(
  Event,
  EventsCache,
  HttpCache
) {

  return Backbone.Collection.extend({
    model: Event,

    initialize: function(models, options) {
      this.account = options.account;
      this.userToken = options.userToken;
    },

    urlRoot: function () {
      return "https://basecamp.com/" + this.account.getId() + "/api/v1/events.json";
    },

    url: function () {
      if (this.modifiedSince == undefined) {
        return this.urlRoot();
      } else {
        return this.urlRoot() + "?since=" + this.modifiedSince;
      }
    },

    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
    },

    fetchAuthorized: function(params) {
      var that = this;
      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", ("Bearer " + that.userToken.current()));

          var lastModifiedHeader = HttpCache.getLastModifiedHeader(that.url);

          if (lastModifiedHeader != undefined) {
            xhr.setRequestHeader("If-Modified-Since", lastModifiedHeader);
          }
        },
        success: function (model, collection, event) {
          HttpCache
            .storeLastModifiedHeader(
              that.url,
              event.xhr.getResponseHeader('Last-Modified')
            );
        }
      };

      return this.fetch(_.extend(defaults, params));
    },

    startStream: function () {
      var that = this;

      var fetchEvents = function () {
        if (that.models[0] != undefined) {
          that.modifiedSince = that.models[0].get("created_at");
        }

        that.fetchAuthorized({ update: true, timeout: 50000 });
      };
      fetchEvents();

      this.stream = setInterval(fetchEvents, 60 * 1000);
    },

    updateCache: function () {
      EventsCache.update(this.url, this.toJSON());
    },

    fetchCached: function () {
      var cached = EventsCache.get(this.url);
      var promise = $.Deferred();

      this.set(this.parse(cached));

      promise.resolve(this);

      return promise.promise();
    },

    stopStream: function() {
      clearInterval(this.stream);
    }
  });
});
