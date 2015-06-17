import { Fluxo, _ } from "libs";
import User from "services/user";
import ArrayLocalStorage from "services/array_local_storage";

 export default {
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

    store.setAttribute("loading", true);

    // We need first grab the current user ID on the new listened account to not
    // show the current user events, and it's only possibile with the user ID on the
    // account.
    userIDLoading.then(function() {
      ArrayLocalStorage.add("listenedAccounts", accountID);

      store.set({ loading: false, listened: true });

      this._onToggleAccount();
    }.bind(this), function() {
      store.setAttribute("loading", false);

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
