define([
  "services/unread_events_cache",
  "models/user",
  "services/text",
  "backbone"
], function(UnreadEventsCache, User, Text) {

  return Backbone.Model.extend({
    initialize: function() {
      this.set("icon", this.icon());
    },

    viewed: function() {
      return (UnreadEventsCache.unreadItems()[this.id] == undefined);
    },

    icon: function() {
      if (Text.contains(this.get("action"), "re-assigned a to-do")) {
        return "icon-retweet";
      } else if (Text.contains(this.get("action"), "commented on")) {
        return "icon-comment";
      } else if (Text.contains(this.get("action"), "moved a to-do")) {
        return "icon-sort";
      } else if (Text.contains(this.get("action"), "added a to-do")) {
        return "icon-check-empty";
      } else if (Text.contains(this.get("action"), "assigned a to-do")) {
        return "icon-male";
      } else if (Text.contains(this.get("action"), "completed a to-do")) {
        return "icon-check";
      } else if (Text.contains(this.get("action"), "gave") && Text.contains(this.get("action"), "access")) {
        return "icon-key";
      }
    }
  });
});
