define(["services/configs_base", "backbone"], function(ConfigsBase) {

  var base = new ConfigsBase("ignoredEvents", []);
  var module = {};

  module.ignoredEvents = function() {
    return base.get();
  };

  module.toggle = function(key) {
    var ignoredEvents = this.ignoredEvents();

    if (this.isIgnored(key)) {
      ignoredEvents = _.difference(ignoredEvents, [key]);
    } else {
      ignoredEvents = _.union(ignoredEvents, [key]);
    }

    base.save(ignoredEvents);
  };

  module.isIgnored = function(key) {
    return _.contains(this.ignoredEvents(), key);
  };

  return module;
});
