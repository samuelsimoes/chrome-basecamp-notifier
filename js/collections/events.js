define([
  "models/event",
  "models/user_token",
  "models/user",
  "services/unread_events_cache",
  "services/configs_ignored_events",
  "services/text",
  "backbone",
  "backbone.deferred"
], function(Event, UserToken, User, UnreadEventsCache, ConfigIgnoredEvents, Text) {

  return Backbone.DeferredCollection.extend({
    model: Event,

    initialize: function(models, options) {
      this.url = "https://basecamp.com/" + options.account_id + "/api/v1/events.json";
      this.currentUser = User.current();

      this.on("add", function(event, collection) {
        this.permit(event);
        this.checkEventAsForMe(event);
      });
    },

    // Prevents add the event which the current user is the author
    permit: function(event) {
      if (event.get("creator").name == this.currentUser.fullName() || ConfigIgnoredEvents.isIgnored(event.type())) {
        this.remove(event);
      } else {
        this.trigger("permitedItemAdd", event);
      }
    },

    // Check if the current event is for current user
    checkEventAsForMe: function(event) {
      event.set(
        "for_me",
        Text.contains(event.get("summary"), this.currentUser.partialFullName())
      );
    },

    comparator: function(model) {
      return -Date.parse(model.get("created_at"));
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
