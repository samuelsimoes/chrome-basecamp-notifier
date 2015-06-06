define(["services/array_local_storage"], function(ArrayLocalStorage) {
  var CACHE_KEY = "ignoredEvents"

  return {
    isIgnored: function(eventType) {
      return ArrayLocalStorage.include(CACHE_KEY, eventType);
    },

    add: function(eventType) {
      ArrayLocalStorage.add(CACHE_KEY, eventType);
    },

    remove:function(eventType) {
      ArrayLocalStorage.remove(CACHE_KEY, eventType);
    }
  };
});
