define([], function() {

  var Configs = function() {};

  Configs.prototype.commit = function(configs) {
    localStorage.setItem("configs", JSON.stringify(configs));
  };

  Configs.prototype.configs = function() {
    return JSON.parse(localStorage.getItem("configs")) || {};
  };

  Configs.prototype.get = function(key) {
    return this.configs()[key];
  };

  Configs.prototype.set = function(key, value) {
    var configs = this.configs();
    configs[key] = value;
    this.commit(configs);
  };

  return Configs;
});
