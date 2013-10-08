define([
  "text!templates/popup/comment.html",
  "services/pretty_date",
  "backbone"
], function(
  CommentTpl,
  PrettyDate
) {
  return Backbone.View.extend({
    template: _.template(CommentTpl),

    events: {
      "click": "preventDefault",
      "click .send-to-basecamp-link": "sendToBasecamp",
      "click .close-link": "close"
    },

    initialize: function () {
      this.listenToOnce(this.model, "sync", this.render);
    },

    render: function () {
      var viewVars = _.extend(this.model.toJSON(), {
        avatar_url: this.model.creatorAvatarUrl(),
        url: this.model.getUrl(),
        created_date_presented: PrettyDate(this.model.get("created_at"))
      });

      this.$el.html(this.template(viewVars));

      return this;
    },

    close: function (evt) {
      evt.preventDefault();
      this.$el.hide();
    },

    sendToBasecamp: function () {
      chrome.tabs.create({ url: this.model.getUrl() });
    },

    preventDefault: function (evt) {
      evt.stopPropagation();
    }
  });
});
