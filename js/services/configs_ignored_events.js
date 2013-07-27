define(["services/configs_base", "backbone"], function(ConfigsBase) {

  ConfigsBase.ignoredEvents = function() {
    return this.get("ignoredEvents") || [];
  };

  ConfigsBase.toggle = function(key) {
    var ignoredEvents = this.ignoredEvents();

    if (this.isIgnored(key)) {
      ignoredEvents = _.difference(ignoredEvents, [key]);
    } else {
      ignoredEvents = _.union(ignoredEvents, [key]);
    }

    this.set("ignoredEvents", ignoredEvents);
  };

  ConfigsBase.isIgnored = function(key) {
    return _.has(this.ignoredEvents(), key);
  };

  return ConfigsBase;
});
