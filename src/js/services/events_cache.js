define(["services/array_local_storage"], function(ArrayLocalStorage) {
  var CACHE_SIZE = 80;

  return {
    get: function (accountID) {
      return ArrayLocalStorage.getAll(accountID);
    },

    clear: function(accountID) {
      return ArrayLocalStorage.update(accountID, []);
    },

    getStarred: function(accountID) {
      return ArrayLocalStorage.getAll(("starred-items-" + accountID));
    },

    storeStarred: function(accountID, data) {
      return ArrayLocalStorage.add(("starred-items-" + accountID), data);
    },

    removeStarred: function(accountID, eventID) {
      return ArrayLocalStorage.removeByID(("starred-items-" + accountID), eventID);
    },

    addSome: function(accountID, data) {
      var currentCache = this.get(accountID),
          cache = currentCache.concat(data);

      cache = cache.sort(function(a, b) {
        return (new Date(b.created_at)) - (new Date(a.created_at));
      });

      cache = cache.slice(0, CACHE_SIZE);

      ArrayLocalStorage.update(accountID, cache);
    }
  };
});
