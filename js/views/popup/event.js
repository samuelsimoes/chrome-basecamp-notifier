define([
  "text!templates/popup/event.html",
  "models/event",
  "services/text",
  "backbone"
], function(EventTpl, Event, Text) {
  return Backbone.View.extend({
    template: _.template(EventTpl),

    tagName: "li",

    events: {
      "click .event-item": "sendToBasecamp"
    },

    render: function() {
      this.model.set("summary", Text.truncate(this.model.get("summary"), 100, "..."));
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    },

    sendToBasecamp: function() {
      chrome.tabs.create({ url: this.model.get("html_url") });
    }
  });
});
