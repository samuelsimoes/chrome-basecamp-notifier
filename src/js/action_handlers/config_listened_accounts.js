define([
  "fluxo",
  "services/user",
  "services/array_local_storage",
  "underscore"
], function(
  Fluxo,
  User,
  ArrayLocalStorage,
  _
) {
  return {
    initialize: function (listenedAccountsStore) {
      this.listenedAccountsStore = listenedAccountsStore;
      this._load();
    },

    _load: function() {
      var accountsData = User.getCurrent().accounts;

      accountsData = _.filter(accountsData, function(accountData) {
        return accountData.product === "bcx";
      });

      accountsData.forEach(function(accountData) {
        accountData.listened = ArrayLocalStorage.include("listenedAccounts", accountData.id);
      });

      this.listenedAccountsStore.resetFromData(accountsData);
    },

    listen: function(accountID) {
      var store = this.listenedAccountsStore.find(accountID);

      var userIDLoading = User.fetchIDOnAccount(accountID);

      // We need first grab the current user ID on the new listened account to not
      // show the current user events, and it's only possibile with the user ID on the
      // account.
      userIDLoading.done(function() {
        ArrayLocalStorage.add("listenedAccounts", accountID);

        store.setAttribute("listened", true);

        this._onToggleAccount();
      }.bind(this));

      userIDLoading.fail(function() {
        alert("Can't fetch account.");
      });
    },

    unlisten: function(accountID) {
      var store = this.listenedAccountsStore.find(accountID);

      ArrayLocalStorage.remove("listenedAccounts", accountID);

      store.setAttribute("listened", false);

      this._onToggleAccount();
    },

    _onToggleAccount: function() {
      Fluxo.Radio.publish("listenedProjectsChanged");
      chrome.runtime.getBackgroundPage(function(page) { page.location.reload(); });
    }
  };
});
