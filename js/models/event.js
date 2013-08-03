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
      this.set("type", this.type());
    },

    viewed: function() {
      return !_.contains(UnreadEventsCache.unreadItems(), this.id);
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
      } else if (Text.contains(this.get("action"), "deleted a comment")) {
        return "delete_comment";
      } else if (Text.contains(this.get("action"), "changed a to-do")) {
        return "changed_todo";
      } else if (Text.contains(this.get("action"), "deleted an event")) {
        return "deleted_event";
      } else if (Text.contains(this.get("action"), "rescheduled an event")) {
        return "rescheduled_event";
      } else if (Text.contains(this.get("action"), "created a to-do list")) {
        return "create_todo_list";
      } else if (Text.contains(this.get("action"), "invited")) {
        return "invite";
      } else if (Text.contains(this.get("action"), "re-opened a to-do")) {
        return "reopened_todo";
      } else if (Text.contains(this.get("action"), "removed the assignment")) {
        return "removed_assignment";
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
      delete_comment: { label: "Delete Comment", icon: "icon-remove" },
      changed_todo: { label: "Change to-do", icon: "icon-exchange" },
      deleted_event: { label: "Delete Event", icon: "icon-calendar" },
      rescheduled_event: { label: "Reschedule Event", icon: "icon-calendar-empty" },
      create_todo_list: { label: "Create to-do list", icon: "icon-list-ol" },
      invite: { label: "Invite to Project", icon: "icon-bullhorn" },
      removed_assignment: { label: "Remove assignment", icon: "icon-remove" },
      reopened_todo: { label: "Remove assignment", icon: "icon-edit" }
    }
  });

  return Event;
});
