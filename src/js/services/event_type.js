import Text from "services/text";

// Sadly Basecamp doesn't send any standalone enum like info about the event
// type, so we need deduce this by verifying the "action" text.
export default {
  discoverAndGetInfos: function(action) {
    return this.types[this.discover(action)] || {};
  },

  discover: function(action) {
    if (Text.contains(action, "re-assigned a to-do")) {
      return "re_assign_todo";
    } else if (Text.contains(action, "commented on")) {
      return "comment";
    } else if (Text.contains(action, "moved a to-do")) {
      return "move_todo";
    } else if (Text.contains(action, "added a to-do")) {
      return "add_todo";
    } else if (Text.contains(action, "assigned a to-do")) {
      return "assign_todo";
    } else if (Text.contains(action, "completed a to-do")) {
      return "complete_todo";
    } else if (Text.contains(action, "gave") && Text.contains(action, "access")) {
      return "gave_access";
    } else if (Text.contains(action, "posted a message")) {
      return "message";
    } else if (Text.contains(action, "deleted a to-do")) {
      return "delete_todo";
    } else if (Text.contains(action, "deleted a comment")) {
      return "delete_comment";
    } else if (Text.contains(action, "deleted a message")) {
      return "delete_message";
    } else if (Text.contains(action, "changed a to-do")) {
      return "changed_todo";
    } else if (Text.contains(action, "deleted an event")) {
      return "deleted_event";
    } else if (Text.contains(action, "rescheduled an event")) {
      return "rescheduled_event";
    } else if (Text.contains(action, "created a to-do list")) {
      return "create_todo_list";
    } else if (Text.contains(action, "invited")) {
      return "invite";
    } else if (Text.contains(action, "re-opened a to-do")) {
      return "reopened_todo";
    } else if (Text.contains(action, "created an event")) {
      return "created_event";
    } else if (Text.contains(action, "created a document")) {
      return "created_document";
    } else if (Text.contains(action, "removed the assignment")) {
      return "removed_assignment";
    } else if (Text.contains(action, "uploaded a file")) {
      return "uploaded_file";
    } else if (Text.contains(action, "deleted a file")) {
      return "deleted_file";
    } else if (Text.contains(action, "removed") && Text.contains(action, "from the project")) {
      return "removed_permission_from_project";
    } else if (Text.contains(action, "created the project")) {
      return "create_project";
    } else if (Text.contains(action, "changed the project name")) {
      return "project_renamed";
    } else if (Text.contains(action, "changed the project description")) {
      return "project_description_renamed";
    }
  },

  types: {
    re_assign_todo: { label: "Re-Assigned a to-do", icon: "icon-retweet", key: "re_assign_todo" },
    comment: { label: "Comments", icon: "icon-comment", key: "comment" },
    move_todo: { label: "Move to-do", icon: "icon-sort", key: "move_todo" },
    add_todo: { label: "Add to-do", icon: "icon-check-empty", key: "add_todo" },
    assign_todo: { label: "Assigns to-do", icon: "icon-male", key: "assign_todo" },
    complete_todo: { label: "Completes to-do", icon: "icon-check", key: "complete_todo" },
    gave_access: { label: "Gave Access", icon: "icon-key", key: "gave_access" },
    message: { label: "Post Messages", icon: "icon-envelope", key: "message" },
    delete_todo: { label: "Delete to-do", icon: "icon-remove", key: "delete_todo" },
    delete_comment: { label: "Delete Comment", icon: "icon-remove", key: "delete_comment" },
    delete_message: { label: "Delete Message", icon: "icon-remove", key: "delete_message" },
    removed_permission_from_project: { label: "Remove permission from Project", icon: "icon-remove", key: "removed_permission_from_project" },
    changed_todo: { label: "Change to-do", icon: "icon-exchange", key: "changed_todo" },
    deleted_event: { label: "Delete Event", icon: "icon-remove", key: "deleted_event" },
    rescheduled_event: { label: "Reschedule Event", icon: "icon-calendar-empty", key: "rescheduled_event" },
    create_todo_list: { label: "Create to-do list", icon: "icon-list-ol", key: "create_todo_list" },
    invite: { label: "Invite to Project", icon: "icon-bullhorn", key: "invite" },
    removed_assignment: { label: "Remove assignment", icon: "icon-remove", key: "removed_assignment" },
    reopened_todo: { label: "Re-open a todo", icon: "icon-edit", key: "reopened_todo" },
    created_document: { label: "Create a document", icon: "icon-file-text", key: "created_document" },
    created_event: { label: "Create an event", icon: "icon-calendar", key: "created_event" },
    uploaded_file: { label: "Upload a file", icon: "icon-picture", key: "uploaded_file" },
    deleted_file: { label: "Delete a file", icon: "icon-remove", key: "deleted_file" },
    create_project: { label: "Create Project", icon: "icon-briefcase", key: "create_project" },
    project_renamed: { label: "Rename Project", icon: "icon-edit", key: "project_renamed" },
    project_description_renamed: { label: "Change Project Description", icon: "icon-quote-left", key: "project_description_renamed" }
  }
};
