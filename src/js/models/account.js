define([
  "collections/projects",
  "collections/events",
  "collections/starred_events",
  "models/user_token",
  "backbone"
], function(
  Projects,
  Events,
  StarredEvents,
  UserToken
) {

  return Backbone.Model.extend({
    getId: function () {
      return this.get("id");
    },

    getName: function () {
      return this.get("name");
    },

    getProjects: function () {
      if (!this.projects) {
        this.projects = new Projects({}, { account: this });
      }

      return this.projects;
    },

    getEvents: function (attribute) {
      return new Events([], { account: this, userToken: UserToken });
    },

    getStarredEvents: function () {
      return new StarredEvents([], { account: this });
    }
  });
});
