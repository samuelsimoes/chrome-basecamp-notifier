define(["model/user_token", "backbone"], function (UserToken) {
  return Backbone.DeferredCollection.extend({
    initialize: function(models, options) {
      url: "https://basecamp.com/" + options.account_id + "/api/v1/projects.json"
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
