define([
  "services/unread_events_cache",
  "models/user",
  "services/text",
  "backbone"
], function(UnreadEventsCache, User, Text) {

  var Event = Backbone.Model.extend({
    initialize: function() {
      this.set("icon", this.icon());
      this.set("viewed", this.viewed());
    },

    viewed: function() {
      return (UnreadEventsCache.unreadItems()[this.id] == undefined);
    },

    icon: function() {
      var type = this.type();
      var typeInfos = Event.types[type];

      if (type && typeInfos) {
        return typeInfos.icon;
      }
    },

    type: function() {
      if (Text.contains(this.get("action"), "re-assigned a to-do")) {
        return "re_assign_todo";
      } else if (Text.contains(this.get("action"), "commented on")) {
        return "comment";
      } else if (Text.contains(this.get("action"), "moved a to-do")) {
        return "move_todo";
      } else if (Text.contains(this.get("action"), "added a to-do")) {
        return "add_todo";
      } else if (Text.contains(this.get("action"), "assigned a to-do")) {
        return "assign_todo";
      } else if (Text.contains(this.get("action"), "completed a to-do")) {
        return "complete_todo";
      } else if (Text.contains(this.get("action"), "gave") && Text.contains(this.get("action"), "access")) {
        return "gave_access";
      } else if (Text.contains(this.get("action"), "posted a message")) {
        return "message";
      } else if (Text.contains(this.get("action"), "deleted a to-do")) {
        return "delete_todo";
      }
    }
  }, {
    types: {
      re_assign_todo: { label: "Re-Assigned a to-do", icon: "icon-retweet" },
      comment: { label: "Comments", icon: "icon-comment" },
      move_todo: { label: "Move to-do", icon: "icon-sort" },
      add_todo: { label: "Add to-do", icon: "icon-check-empty" },
      assign_todo: { label: "Assigns to-do", icon: "icon-male" },
      complete_todo: { label: "Completes to-do", icon: "icon-check" },
      gave_access: { label: "Gave Access", icon: "icon-key" },
      message: { label: "Post Messages", icon: "icon-envelope" },
      delete_todo: { label: "Delete to-do", icon: "icon-remove" },
    }
  });

  return Event;
});
