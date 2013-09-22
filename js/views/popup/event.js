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

    render: function() {
      this.model.set("summary", Text.truncate(this.model.get("summary"), 85, "..."));

      var viewVars = _.extend(this.model.toJSON(), { is_starred: this.model.isStarred() });

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
