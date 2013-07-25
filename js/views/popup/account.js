define([
  "text!templates/popup/account.html",
  "collections/events",
  "services/badge",
  "views/popup/event",
  "backbone"
], function(AccountTpl, Events, Badge, EventView) {
  return Backbone.View.extend({
    template: _.template(AccountTpl),

    render: function() {
      this.setElement(this.template({ name: this.model.get("name") }));
      this.renderEvents();
      return this.el;
    },

    checkAllEventsAsRead: function(collection) {
      collection.markAsRead();
      Badge.update();
    },

    renderEvents: function() {
      var that = this;
      var events = this.eventsCollection().fetchCached();

      events.done(function(collection) {
        _.each(_.first(collection.models, 10), function(model) {
          that.renderEvent(model);
        });

        that.checkAllEventsAsRead(collection);
      });
    },

    renderEvent: function(eventItem) {
      var event = new EventView({ model: eventItem });
      this.$el.find(".notification-list").append(event.render());
    },

    eventsCollection: function() {
      return new Events([], { account_id: this.model.get("id") });
    }
  });
});
