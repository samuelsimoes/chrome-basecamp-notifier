define([
  "text!templates/popup/event.html",
  "models/event",
  "services/text",
  "backbone"
], function(EventTpl, Event, Text) {
  return Backbone.View.extend({
    template: _.template(EventTpl),

    render: function() {
      this.model.set("summary", Text.truncate(this.model.get("summary"), 100, "..."));
      this.setElement(this.template(this.model.toJSON()));
      return this.el;
    }
  });
});
