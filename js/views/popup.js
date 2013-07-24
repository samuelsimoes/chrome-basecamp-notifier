define([
  "collections/accounts",
  "views/popup/accounts",
  "services/listened_accounts",
  "backbone"
], function(Accounts, AccountsView, ListenedAccounts) {
  return Backbone.View.extend({
    render: function() {
      var listenedAccounts = new Accounts(this.listenedAccounts());
      var accountsView = new AccountsView({ collection: listenedAccounts });

      accountsView.render();
    },

    listenedAccounts: function() {
      return _.values(ListenedAccounts.listenedAccounts());
    }
  });
});
