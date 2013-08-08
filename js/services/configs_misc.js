define([
  "services/configs_base"
], function(
  ConfigsBase
) {

  var base = new ConfigsBase("miscConfigs", {});
  var module = {};

  module.allConfigs = function() {
    return base.get();
  };

  module.get = function(key) {
    return this.allConfigs()[key];
  };

  module.toggle = function(key) {
    var allConfigs = this.allConfigs();
    allConfigs[key] = !allConfigs[key];
    base.save(allConfigs);
  };

  return module;
});
