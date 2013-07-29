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
        var eventModel = _.extend(events[event], { key: event });
        var eventView = new EventView({ model: eventModel });
        $("#tabs2-events").append(eventView.render());
      }
    }
  });
});
