define([
  "services/configs_ignored_events",
  "views/config/event",
  "services/event_type",
  "backbone"
], function(
  ConfigIgnoredEvents,
  EventView,
  EventTypes
) {
  return Backbone.View.extend({
    render: function() {
      var events = EventTypes.types;

      for(event in events) {
        var eventModel = _.extend(events[event], { key: event });
        var eventView = new EventView({ model: eventModel });
        this.$el.append(eventView.render());
      }

      return this;
    }
  });
});
