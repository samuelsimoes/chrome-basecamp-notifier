define([
  "models/user_token",
  "models/project",
  "backbone"
], function (
  UserToken,
  Project
) {

  return Backbone.Collection.extend({
    model: Project,

    url: function () {
      return "https://basecamp.com/" + this.account.getId() + "/api/v1/projects.json";
    },

    initialize: function(models, options) {
      this.account = options.account;
    },

    fetchAuthorized: function(params) {
      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + UserToken.current()));
        }
      };

      return this.fetch(_.extend(defaults, params));
    }
  });
});
