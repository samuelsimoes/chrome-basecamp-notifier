define([
  "text!templates/popup/event.html",
  "models/event",
  "services/text",
  "backbone"
], function(EventTpl, Event, Text) {
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

      return this.el;
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
      chrome.tabs.create({ url: this.model.get("html_url") });
    }
  });
});
