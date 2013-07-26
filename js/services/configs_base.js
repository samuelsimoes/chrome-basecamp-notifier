define([], function() {

  var module = {};
  window.configCache;

  module.commit = function() {
    localStorage.setItem("configs", JSON.stringify(window.configCache));
  };

  module.configs = function() {
    if (window.configCache != undefined) {
      return window.configCache;
    } else {
      var configs = JSON.parse(localStorage.getItem("configs")) || {};
      window.configCache = configs;
      return configs;
    }
  };

  module.get = function(key) {
    return this.configs()[key];
  };

  module.set = function(key, value) {
    var cachedValue = this.get(key);
    window.configCache[key] = value;
    this.commit();
  };

  return module;

});
