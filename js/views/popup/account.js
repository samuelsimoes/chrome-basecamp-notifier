define([
  "text!templates/popup/account.html",
  "collections/events",
  "views/popup/event",
  "backbone",
  "easytab"
], function(
  AccountTpl,
  Events,
  EventView
) {

  return Backbone.View.extend({
    template: _.template(AccountTpl),

    render: function() {
      var that = this;

      this.setElement(this.template({ name: this.model.get("name"), cid: this.model.cid }));

      var starredEventsPromise = this.model.getStarredEvents();
      var latestEventsPromise = this.model.getEventsFromCache();

      starredEventsPromise.done(function (collection) {
        that.starredEvents = collection;

        that.listenStarEvents();
        that.renderStarredItems();
      });

      latestEventsPromise.done(function (collection) {
        that.eventsCollection = collection;
        that.renderEvents();
      });

      this.$el.easytabs({ animationSpeed: "fast" });

      this.renderEvents();

      return this.el;
    },

    listenStarEvents: function () {
      this.on("star-item", function (eventItem) {
        this.starredEvents.addEvent(eventItem);
      }, this);

      this.on("remove-star", function (eventItem) {
        this.starredEvents.removeEvent(eventItem);
      }, this);

      this.on("remove-star star-item", function () {
        this.renderEvents();
        this.renderStarredItems();
      }, this);
    },

    renderStarredItems: function () {
      var target = this.$el.find(".starred-items-list");

      target.html("");

      _.each(this.starredEvents.models, function(model) {
        target.append(this.renderEvent(model));
      }, this);
    },

    renderEvents: function() {
      var target = this.$el.find(".latest-notifications");

      target.html("");

      if (_.isEmpty(this.eventsCollection.models)) {
        this.renderNoItemsMessage();
      } else {
        _.each(this.eventsCollection.models, function(model) {
          target.append(this.renderEvent(model));
        }, this);
      }
    },

    renderNoItemsMessage: function () {
      this.$el.find(".notification-list").html("<li class='no-items'>No new events</li>");
    },

    renderEvent: function(eventItem, type) {
      return new EventView({ model: eventItem, parentView: this }).render();
    }
  });
});
