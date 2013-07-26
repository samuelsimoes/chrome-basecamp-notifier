define([], function() {

  var module = {};
  var configCache;

  module.commit = function() {
    localStorage.setItem("configs", JSON.stringify(configCache));
  };

  module.configs = function() {
    if (configCache != undefined) {
      return configCache;
    } else {
      var configs = JSON.parse(localStorage.getItem("configs")) || {};
      configCache = configs;
      return configs;
    }
  };

  module.get = function(key) {
    return this.configs()[key];
  };

  module.set = function(key, value) {
    var cachedValue = this.get(key);
    configCache[key] = value;
    this.commit();
  };

  return module;

});
