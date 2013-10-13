define([
  "text!templates/popup/event.html",
  "models/event",
  "services/text",
  "views/popup/comment",
  "backbone"
], function(
  EventTpl,
  Event,
  Text,
  CommentView
) {
  return Backbone.View.extend({
    template: _.template(EventTpl),

    tagName: "li",

    className: "event-view",

    events: {
      "click": "sendToBasecamp",
      "click .star-item" : "toggleStar"
    },

    initialize: function () {
      this.parentView = this.options.parentView;
      this.resolveCommentView();
    },

    resolveCommentView: function () {
      if (!this.model.isCommentEvent()) {
        return;
      }

      this.commentView = new CommentView({
        model: this.model.comment(),
        el: this.$el.find(".second-line")
      });
    },

    summary: function () {
      var treatedSummary = Text.stripTags(this.model.get("summary"));
      treatedSummary = Text.unescapeHTML(treatedSummary);

      var creatorNameLength = this.model.creatorFirstName().length;
      var bucketNameLength = this.model.bucketName().length;
      var summaryLength = 108 - (creatorNameLength + bucketNameLength);

      return Text.truncate(treatedSummary, summaryLength, "...");
    },

    render: function() {
      var viewVars = _.extend(this.model.toJSON(), {
        is_starred: this.model.isStarred(),
        avatar_url: this.model.creatorAvatarUrl(),
        creator_name: this.model.creatorFirstName(),
        summary: this.summary()
      });

      this.$el.html(this.template(viewVars));

      if (!this.model.viewed()) {
        this.$el.addClass("unread");
      }

      if (this.model.isCommentEvent()) {
        this.commentView.setElement(this.$el.find(".second-line"));
      }

      return this;
    },

    toggleStar: function (evt) {
      evt.stopPropagation();
      evt.preventDefault();

      if (this.model.isStarred()) {
        this.parentView.trigger("remove-star", this.model);
      } else {
        this.parentView.trigger("star-item", this.model);
      }
    },

    sendToBasecamp: function() {
      if (this.model.isCommentEvent()) {
        var comment = this.model.comment();
        this.$el.find(".second-line").toggle();
        comment.fetchAuthorized();
      } else {
        chrome.tabs.create({ url: this.model.get("html_url") });
      }
    }
  });
});
