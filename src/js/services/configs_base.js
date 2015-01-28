define([], function() {

  var Configs = function(configKey, defaultValue) {
    this.configKey = configKey;
    this.defaultValue = defaultValue;
  };

  Configs.prototype.commit = function() {
    localStorage.setItem(this.configKey, JSON.stringify(this.cache));
  };

  Configs.prototype.get = function() {
    if (!this.cache) {
      this.cache = JSON.parse(localStorage.getItem(this.configKey)) || this.defaultValue;
    }
    return this.cache;
  };

  Configs.prototype.save = function(value) {
    this.cache = value;
    this.commit();
  };

  return Configs;
});
