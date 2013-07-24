define([
  "models/event",
  "models/user_token",
  "services/unread_events_cache",
  "backbone",
  "backbone.deferred"
], function(Event, UserToken, UnreadEventsCache) {

  return Backbone.DeferredCollection.extend({
    model: Event,

    initialize: function(models, options) {
      this.url = "https://basecamp.com/" + options.account_id + "/api/v1/events.json";
    },

    fetchAuthorized: function(params) {
      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + UserToken.current()));
        }
      };

      return this.fetch(_.extend(defaults, params));
    },

    markAsRead: function() {
      var ids = _.pluck(this.toJSON(), "id");
      UnreadEventsCache.markAsRead(ids);
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
        if(UserToken.current() != undefined) {
          fetch();
        } else {
          that.stopStream();
        }
      };

      this.stream = setInterval(resolveAction, 3 * 1000);

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
