define(["services/configs_base", "backbone"], function(ConfigsBase) {

  ConfigsBase.listenedEvents = function() {
    return this.get("listenedEvents") || [];
  };

  ConfigsBase.toggle = function(key) {
    var listenedEvents = this.listenedEvents();

    if (this.isListened(key)) {
      listenedEvents = _.difference(listenedEvents, [key]);
    } else {
      listenedEvents = _.union(listenedEvents, [key]);
    }

    this.set("listenedEvents", listenedEvents);
  };

  ConfigsBase.isListened = function(key) {
    return _.has(this.listenedEvents(), key);
  };

  return ConfigsBase;
});
