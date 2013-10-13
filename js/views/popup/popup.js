define([
  "collections/accounts",
  "views/popup/accounts",
  "services/configs_listened_accounts",
  "services/unread_events_cache",
  "services/badge",
  "models/user_token",
  "app",
  "backbone"
], function(
  Accounts,
  AccountsView,
  ConfigListenedAccounts,
  UnreadEventsCache,
  Badge,
  UserToken,
  App
) {
  return Backbone.View.extend({
    render: function() {
      if (UserToken.current()) {
        var listenedAccounts = new Accounts(this.listenedAccounts());
        var accountsView = new AccountsView({ collection: listenedAccounts });

        accountsView.render();

        this.markAllAsRead();
      } else {
        chrome.tabs.create({ url: App.askForAuthorizationUri });
      }
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
