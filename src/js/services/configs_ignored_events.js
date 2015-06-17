import ArrayLocalStorage from "services/array_local_storage";

var CACHE_KEY = "ignoredEvents";

export default {
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
