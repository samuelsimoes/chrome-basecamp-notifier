define([
  "text!templates/popup/event.html",
  "backbone"
], function(EventTpl) {
  return Backbone.View.extend({
    template: _.template(EventTpl),

    render: function() {
      this.setElement(this.template(this.model.toJSON()));
      return this.el;
    }
  });
});
