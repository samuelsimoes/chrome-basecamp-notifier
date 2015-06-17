import User from "services/user";
import ArrayLocalStorage from "services/array_local_storage";

var CACHE_KEY = "listenedAccounts";

export default {
  isListened: function(accountID) {
    return ArrayLocalStorage.include(CACHE_KEY, accountID);
  },

  add: function(accountID) {
    ArrayLocalStorage.add(CACHE_KEY, accountID);
  },

  remove:function(accountID) {
    ArrayLocalStorage.remove(CACHE_KEY, accountID);
  },

  getAccounts: function() {
    var currentUser = User.getCurrent();

    if (!currentUser) { return []; }

    return currentUser.accounts.filter(function(accountData) {
      return ArrayLocalStorage.include(CACHE_KEY, accountData.id);
    });
  }
};
