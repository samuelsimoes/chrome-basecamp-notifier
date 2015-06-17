import ArrayLocalStorage from "services/array_local_storage";

var CACHE_KEY = "ignoredProjects";

export default {
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
