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
    render: function() {
      var events = Event.types;

      for(event in events) {
        var eventModel = _.extend(events[event], { key: event });
        var eventView = new EventView({ model: eventModel });
        this.$el.append(eventView.render());
      }

      return this;
    }
  });
});
