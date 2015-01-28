define([
  "views/popup/event",
  "services/filter",
  "backbone"
], function(
  EventView,
  Filter
) {

  return Backbone.View.extend({
    events: {
      "click .load-more" : "loadMoreItems"
    },

    initialize: function (options) {
      this.listenTo(this.collection, "sync", this.render);

      this.on("star-item", function (model) {
        options.parentView.trigger("star-item", model);
      }, this);

      this.on("remove-star", function (model) {
        options.parentView.trigger("remove-star", model);
      }, this);

      Filter.watch(this.collection);
    },

    render: function () {
      this.container = this.$el.find(".notification-list");
      this.container.empty();
      this.collection.forEach(this.renderOne, this);
    },

    renderOne: function (eventItem) {
      var view = new EventView({ model: eventItem, parentView: this });
      this.container.append(view.render().el);
    },

    loadMoreItems: function (evt, timeCount) {
      evt.preventDefault();

      var that = this;
      var button = $(evt.target);
      var loadedItems = false;
      var timeCounter = _.isUndefined(timeCount) ? 1 : timeCount;

      button.html("Loading...");

      this.listenToOnce(this.collection, "filtrated-add", function () {
        loadedItems = true;
      });

      var promise = this.collection.fetchNextPage();

      promise.done(function () {
        // 4 attempts for get an page with content
        if (loadedItems || timeCounter == 4) {
          button.html("Load more Items");
        } else {
          that.loadMoreItems(evt, (timeCounter + 1));
        }
      });
    }
  });
});
