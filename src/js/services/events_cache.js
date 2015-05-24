define(["services/array_local_storage"], function(ArrayLocalStorage) {
  var CACHE_SIZE = 80;

  return function(accountID, eventsData) {
    eventsData = eventsData.sort(function(data) {
      return new Date(data.created_at);
    });

    var trimmCache = function() {
      var currentCache = ArrayLocalStorage.getAll(accountID);

      trimmedCache = currentCache.slice(-CACHE_SIZE, currentCache.length);

      ArrayLocalStorage.update(accountID, trimmedCache);
    };

    var cacheItem = function(eventData) {
      ArrayLocalStorage.addItem(accountID, _.extend(eventData, { unread: true }));
    };

    _.each(eventsData, cacheItem);

    trimmCache();
  };
});
