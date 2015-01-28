define([
  "text!templates/popup/account.html",
  "collections/events",
  "views/popup/events",
  "easytab",
  "backbone"
], function(
  AccountTpl,
  Events,
  EventsView) {
  return Backbone.View.extend({
    template: _.template(AccountTpl),

    className: "account",

    initialize: function () {
      this.starredEvents = this.model.getStarredEvents();
      this.latestEvents = this.model.getEvents();

      this.latestEventsView = new EventsView({ collection: this.latestEvents, parentView: this });
      this.starredEventsView = new EventsView({ collection: this.starredEvents, parentView: this });

      this.on("star-item", function (eventItem) {
        this.starredEvents.addEvent(eventItem);
      }, this);

      this.on("remove-star", function (eventItem) {
        this.starredEvents.removeEvent(eventItem);
      }, this);

      this.on("remove-star star-item", function () {
        this.latestEventsView.render();
        this.starredEventsView.render();
      }, this);
    },

    render: function() {
      var viewVars = { name: this.model.get("name"), cid: this.model.cid };

      this.$el.html(this.template(viewVars));

      this.$el.easytabs({ animationSpeed: "fast" });

      this.latestEventsView.
        setElement(this.$el.find("div.latest-notifications"));

      this.starredEventsView.
        setElement(this.$el.find(".starred-items-list"));

      this.latestEvents.fetchCached();
      this.starredEvents.fetch();

      return this;
    }
  });
});
