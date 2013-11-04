define([
  "backbone"
], function(
) {

  /*
   * The only way actually to get the comment is getting an event json and search
   * in this for the comment content.
   */
  return Backbone.Model.extend({
    initialize: function(data, options) {
      this.userToken = options.userToken;

      var commentId = this.get("id");
      var htmlUrl = this.get("html_url");
      var values;

      this.on("sync", function () {
        this.fetched = true;

        /*
         * In some strange cases Basecamp send a comment event, but not send
         * the comment ID as anchor in html_url, then I must assume which the first
         * comment of event content is the comment announced.
         */
        if (_.isUndefined(commentId)) {
          values = this.get("comments")[0];
        } else {
          values = _.findWhere(this.get("comments"), { id: parseInt(commentId, 10) });
        }

        this.clear();

        this.set(_.extend({ html_url: htmlUrl }, values));
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
