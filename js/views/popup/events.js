define([
  "views/popup/event",
  "backbone"
], function(
  EventView
) {

  return Backbone.View.extend({
    initialize: function (options) {
      this.listenTo(this.collection, "sync", this.render);

      this.on("star-item", function (model) {
        options.parentView.trigger("star-item", model);
      }, this);

      this.on("remove-star", function (model) {
        options.parentView.trigger("remove-star", model);
      }, this);
    },

    render: function () {
      this.container = this.$el.find(".notification-list");
      this.container.empty();
      this.collection.forEach(this.renderOne, this);
    },

    renderOne: function (eventItem) {
      var view = new EventView({ model: eventItem, parentView: this });
      this.container.append(view.render().el);
    }
  });
});
