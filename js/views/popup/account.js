define([
  "text!templates/popup/account.html",
  "collections/events",
  "views/popup/event",
  "backbone"
], function(AccountTpl, Events, EventView) {
  return Backbone.View.extend({
    template: _.template(AccountTpl),

    render: function() {
      this.setElement(this.template({ name: this.model.get("name") }));
      this.renderEvents();
      return this.el;
    },

    renderEvents: function() {
      var that = this;

      this.events().done(function(eventsCollection) {
        _.each(eventsCollection.models, function(model) {
          that.renderEvent(model);
        });
      });
    },

    renderEvent: function(event) {
      var event = new EventView({ model: event });
      this.$el.find(".notification-list").append(event.render());
    },

    events: function() {
      var events = new Events({ account_id: this.model.get("id") });
      return events.fetch({ cache: true });
    }
  });
});
