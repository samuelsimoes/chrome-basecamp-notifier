define(["services/array_local_storage"], function(ArrayLocalStorage) {
  var CACHE_KEY = "ignoredProjects"

  return {
    isIgnored: function(projectID) {
      return ArrayLocalStorage.include(CACHE_KEY, projectID);
    },

    add: function(projectID) {
      ArrayLocalStorage.add(CACHE_KEY, projectID);
    },

    remove: function(projectID) {
      ArrayLocalStorage.remove(CACHE_KEY, projectID);
    }
  };
});
