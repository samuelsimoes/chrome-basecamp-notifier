define(["services/collection_local_storage"], function(CollectionLocalStorage) {
  var CACHE_SIZE = 80;

  return function(accountID, eventsData) {
    eventsData = eventsData.sort(function(data) {
      return new Date(data.created_at);
    });

    var trimmCache = function() {
      var currentCache = CollectionLocalStorage.getAll(accountID);

      trimmedCache = currentCache.slice(-CACHE_SIZE, currentCache.length);

      CollectionLocalStorage.update(accountID, trimmedCache);
    };

    var cacheItem = function(eventData) {
      CollectionLocalStorage.addItem(accountID, _.extend(eventData, { unread: true }));
    };

    eventsData.forEach(cacheItem);

    trimmCache();
  };
});
