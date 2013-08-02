define([
  "collections/accounts",
  "views/popup/accounts",
  "services/configs_listened_accounts",
  "services/unread_events_cache",
  "services/badge",
  "backbone"
], function(
  Accounts,
  AccountsView,
  ConfigListenedAccounts,
  UnreadEventsCache,
  Badge
) {
  return Backbone.View.extend({
    render: function() {
      var listenedAccounts = new Accounts(this.listenedAccounts());
      var accountsView = new AccountsView({ collection: listenedAccounts });

      accountsView.render();

      this.markAllAsRead();
    },

    markAllAsRead: function() {
      UnreadEventsCache.clear();
      Badge.update();
    },

    listenedAccounts: function() {
      return _.values(ConfigListenedAccounts.listenedAccounts());
    }
  });
});
