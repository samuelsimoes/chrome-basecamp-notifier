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
      var events = this.eventsCollection().fetchCached();

      events.done(function(collection) {
        _.each(_.first(collection.models, 15), function(model) {
          that.renderEvent(model);
        });
      });
    },

    renderEvent: function(eventItem) {
      var event = new EventView({ model: eventItem });
      this.$el.find(".notification-list").append(event.render());
    },

    eventsCollection: function() {
      return new Events([], { account: this.model });
    }
  });
});
