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

      this.stream = setInterval(function() {
        if(UserToken.current() != undefined) {
          that.fetchAuthorized({ update: true });
        } else {
          that.stopStream();
        }
      }, 3 * 1000);
    },

    stopStream: function() {
      clearInterval(this.stream);
    }
  });
});
