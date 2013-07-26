define([
  "text!templates/account.html",
  "services/configs_listened_accounts",
  "backbone"
], function(AccountTpl, ConfigListenedAccounts) {
  return Backbone.View.extend({
    template: _.template(AccountTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template(_.extend(this.model.toJSON(), { selected: this.selected() }));

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
