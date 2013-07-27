define([
  "services/configs_ignored_events",
  "views/config/event",
  "models/event",
  "backbone"
], function(
  ConfigIgnoredEvents,
  EventView,
  Event
) {
  return Backbone.View.extend({
    el: $("#tabs2-events"),

    render: function() {
      var events = Event.types;

      for(event in events) {
        $("#tabs2-events").append(new EventView({ model: events[event] }).render());
      }
    }
  });
});
