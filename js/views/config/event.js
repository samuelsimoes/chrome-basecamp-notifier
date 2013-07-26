define([
  "text!templates/checkbox.html",
  "backbone"
], function(
  CheckboxTpl
) {
  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    /*events: {
      "click :checkbox": "updateStatus"
    },*/

    render: function() {
      var view = this.template({
        selected: false,
        label: this.model.label
      });

      this.setElement(view);

      return this.el;
    }
  });
});
