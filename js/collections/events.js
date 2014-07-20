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
      this.page = 1;
      this.account = options.account;
      this.userToken = options.userToken;

      if (options.fetchPartly) {
        this.attachPartlyFetchBehavior();
      }
    },

    urlRoot: function () {
      return "https://basecamp.com/" + this.account.getId() + "/api/v1/events.json";
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
      var promise = this.fetchAuthorized({
        remove: false,
        data: { page: this.page }
      });

      promise.done(function () {
        that.page += 1;
      });

      return promise;
    },

    attachPartlyFetchBehavior: function () {
      this.on("before-send-request", function (xhr) {
        var lastModifiedHeader = HttpCache.getLastModifiedHeader(this.urlRoot());

        if (lastModifiedHeader) {
          xhr.setRequestHeader("If-Modified-Since", lastModifiedHeader);
        }
      }, this);

      this.on("success-request", function (xhr) {
        HttpCache
          .storeLastModifiedHeader(
            this.urlRoot(),
            xhr.getResponseHeader('Last-Modified')
          );
      }, this);
    },

    fetchAuthorized: function(params) {
      var that = this;

      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", ("Bearer " + that.userToken.current()));
          that.trigger("before-send-request", xhr);
        },
        success: function (model, collection, event) {
          that.trigger("success-request", event.xhr);
        }
      };

      return this.fetch(_.extend(defaults, params));
    },

    startStream: function () {
      var that = this;

      var fetchEvents = function () {
        if (that.models[0]) {
          that.modifiedSince = that.models[0].get("created_at");
        }

        that.fetchAuthorized({ update: true, timeout: 50000 });
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
