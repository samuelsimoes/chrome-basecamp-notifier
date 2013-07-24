define([
  "services/unread_events_cache",
  "backbone"
], function(UnreadEventsCache) {

  return Backbone.Model.extend({
    viewed: function() {
      return (UnreadEventsCache.unreadItems()[this.id] == undefined);
    }
  });
});
