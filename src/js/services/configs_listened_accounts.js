define([
  "services/user",
  "services/array_local_storage",
], function(
  User,
  ArrayLocalStorage
) {
  var CACHE_KEY = "listenedAccounts"

  return {
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
      return _.filter(User.getCurrent().accounts, function(accountData) {
        return ArrayLocalStorage.include(CACHE_KEY, accountData.id);
      });
    }
  };
});
