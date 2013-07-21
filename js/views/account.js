define([
  "text!templates/account.html",
  "services/listened_accounts",
  "backbone"
], function(AccountTpl, ListenedAccounts) {
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
      return ListenedAccounts.isListened(this.model.get("id"));
    },

    updateStatus: function() {
      ListenedAccounts.toggle(this.model.toJSON());
    }
  });
});
