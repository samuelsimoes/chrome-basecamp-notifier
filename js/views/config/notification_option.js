define([
  "text!templates/checkbox.html",
  "services/configs_misc",
  "backbone"
], function(
  CheckboxTpl,
  ConfigsMisc
) {

  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template({
        selected: ConfigsMisc.get("disable_desktop_notifications"),
        label: "Disable desktop notifications?"
      });

      this.setElement(view);

      return this;
    },

    updateStatus: function() {
      ConfigsMisc.toggle("disable_desktop_notifications");
    }
  });
});
