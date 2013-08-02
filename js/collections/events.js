define([
  "models/event",
  "backbone.deferred"
], function(Event) {
  return Backbone.DeferredCollection.extend({
    model: Event,

    initialize: function(models, options) {
      this.account = options.account;
      this.userToken = options.userToken;
      this.url = "https://basecamp.com/" + this.account.get("id") + "/api/v1/events.json";
    },

    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
    },

    fetchAuthorized: function(params) {
      var that = this;
      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", ("Bearer " + that.userToken.current()));
        }
      };

      return this.fetch(_.extend(defaults, params));
    },

    stream: function() {
      var that = this;
      var promise = $.Deferred();

      var fetch = function() {
        var eventsPromise = that.fetchAuthorized({ update: true });

        eventsPromise.done(function(collection){
          promise.notify(collection);
        });
      };

      var resolveAction = function() {
        if(that.userToken.current() != undefined) {
          fetch();
        } else {
          that.stopStream();
        }
      };
      resolveAction();

      this.stream = setInterval(resolveAction, 60 * 1000);

      return promise.promise();
    },

    updateCache: function() {
      return localStorage.setItem(this.url, JSON.stringify(this.toJSON()));
    },

    fetchCached: function() {
      var cached = JSON.parse(localStorage.getItem(this.url)) || [];
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
