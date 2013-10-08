define([
  "backbone"
], function(
) {

  return Backbone.Model.extend({
    initialize: function(data, options) {
      this.userToken = options.userToken;

      var commentId = this.get("id");
      var htmlUrl = this.get("html_url");

      this.on("sync", function () {
        this.fetched = true;

        var values = _.findWhere(this.get("comments"), { id: parseInt(commentId) });

        this.clear();

        this.set(_.extend(values, { html_url: htmlUrl }));
      }, this);
    },

    fetchAuthorized: function(params) {
      var that = this;

      var defaults = {
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + that.userToken));
        }
      };

      return this.fetch(_.extend(defaults, params));
    },

    creatorAvatarUrl: function () {
      return this.get("creator").avatar_url;
    },

    getUrl: function () {
      return this.get("html_url");
    }
  });
});
