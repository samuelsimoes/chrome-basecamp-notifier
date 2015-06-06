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

    toggle: function(accountID) {
      var store = this.listenedAccountsStore.find(accountID),
          listened = store.data.listened;

      var cacheAction = listened ? "remove" : "add";

      ArrayLocalStorage[cacheAction]("listenedAccounts", accountID);

      store.setAttribute("listened", !listened);

      Fluxo.Radio.publish("listenedProjectsChanged");

      chrome.runtime.getBackgroundPage(function(page) { page.location.reload(); });
    }
  };
});
