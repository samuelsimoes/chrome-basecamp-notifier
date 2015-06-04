define([
  "collections/projects",
  "services/user_token",
  "backbone"
], function(
  Projects,
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
    }
  });
});
