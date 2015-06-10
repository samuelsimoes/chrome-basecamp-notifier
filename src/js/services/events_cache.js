define(["services/array_local_storage"], function(ArrayLocalStorage) {
  var CACHE_SIZE = 80;

  return function(accountID, eventsData) {
    var currentCache = ArrayLocalStorage.getAll(accountID),
        cache = currentCache.concat(eventsData);

    cache = cache.sort(function(a, b) {
      return (new Date(b.created_at)) - (new Date(a.created_at));
    });

    cache = cache.slice(0, CACHE_SIZE);

    ArrayLocalStorage.update(accountID, cache);
  };
});
