define([
  "text!templates/checkbox.html",
  "services/configs_ignored_events",
  "backbone"
], function(
  CheckboxTpl,
  ConfigIgnoredEvents
) {
  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template({
        selected: ConfigIgnoredEvents.isIgnored(this.model.key),
        label: this.model.label
      });

      this.setElement(view);

      return this.el;
    },

    updateStatus: function() {
      ConfigIgnoredEvents.toggle(this.model.key);
    }
  });
});
