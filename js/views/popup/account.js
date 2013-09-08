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
        var firstItems = _.first(collection.models, 15);

        if (_.isEmpty(firstItems)) {
          that.renderNoItemsMessage();
        } else {
          _.each(firstItems, function(model) {
            that.renderEvent(model);
          });
        }
      });
    },

    renderNoItemsMessage: function () {
      this.$el.find(".notification-list").html("<li class='no-items'>No new events</li>");
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
