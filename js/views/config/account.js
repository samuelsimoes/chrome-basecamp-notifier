define([
  "text!templates/checkbox.html",
  "services/configs_listened_accounts",
  "backbone"
], function(CheckboxTpl, ConfigListenedAccounts) {
  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template({
        selected: this.selected(),
        label: this.model.get("name")
      });

      this.setElement(view);

      return this.el;
    },

    selected: function() {
      return ConfigListenedAccounts.isListened(this.model.get("id"));
    },

    updateStatus: function() {
      ConfigListenedAccounts.toggle(this.model.toJSON());
    }
  });
});
