define([
  "collections/accounts",
  "views/popup/accounts",
  "services/configs_listened_accounts",
  "backbone"
], function(Accounts, AccountsView, ConfigListenedAccounts) {
  return Backbone.View.extend({
    render: function() {
      var listenedAccounts = new Accounts(this.listenedAccounts());
      var accountsView = new AccountsView({ collection: listenedAccounts });

      accountsView.render();
    },

    listenedAccounts: function() {
      return _.values(ConfigListenedAccounts.listenedAccounts());
    }
  });
});
