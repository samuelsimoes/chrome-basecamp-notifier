define([
  "collections/projects",
  "backbone"
], function(
  Projects
) {

  return Backbone.Model.extend({
    getId: function () {
      return this.get("id");
    },

    getName: function () {
      return this.get("name");
    },

    getProjects: function () {
      if (this.projects == undefined) {
        this.projects = new Projects({}, { account: this });
      }

      return this.projects;
    }
  });
});
