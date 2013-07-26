define(["services/configs_base", "backbone"], function(ConfigsBase) {

  ConfigsBase.listenedEvents = function() {
    return this.get("listenedEvents") || [];
  };

  ConfigsBase.toggleListenedEvent = function(key) {
    var listenedEvents = this.listenedEvents();

    if (this.isListenedEvent(key)) {
      listenedEvents = _.difference(listenedEvents, [key]);
    } else {
      listenedEvents = _.union(listenedEvents, [key]);
    }

    this.set("listenedEvents", listenedEvents);
  };

  ConfigsBase.isListenedEvent = function(key) {
    return _.has(this.listenedEvents(), key);
  };

  return ConfigsBase;
});
