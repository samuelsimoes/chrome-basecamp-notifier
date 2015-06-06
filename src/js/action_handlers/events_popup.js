define([
  "services/collection_local_storage",
  "services/events_filter",
  "services/event_comment_loader"
], function(
  CollectionLocalStorage,
  EventsFilter,
  EventCommentLoader
) {
  var MAX_EVENTS_ON_LIST = 40;

  return {
    initialize: function (eventsStore, starredEventsStore, account) {
      this.eventsStore = eventsStore;
      this.starredEventsStore = starredEventsStore;
      this.account = account;

      this.loadEvents();
      this.loadStarredEvents();
    },

    loadEvents: function() {
      var eventsCache = CollectionLocalStorage.getAll(this.account.id).reverse(),
          filteredCache = EventsFilter(eventsCache.slice(0, MAX_EVENTS_ON_LIST));

      this.eventsStore.resetFromData(filteredCache);

      this.updateAllEventsAsRead();
    },

    updateAllEventsAsRead: function() {
      var eventsCache = CollectionLocalStorage.getAll(this.account.id);

      eventsCache.forEach(function(eventData) {
        if (!eventData.unread) { return; }
        CollectionLocalStorage.updateItem(this.account.id, eventData.id, { unread: false });
      }.bind(this));
    },

    loadStarredEvents: function() {
      var eventsCache = CollectionLocalStorage.getAll((this.account.id + "-starred")).reverse();

      this.starredEventsStore.resetFromData(eventsCache);
    },

    starEvent: function(eventID) {
      var toStarEvent = this.eventsStore.find(eventID);

      toStarEvent.setAttribute("starred", true);

      var eventData = _.omit(toStarEvent.data, "showingComment", "unread");

      CollectionLocalStorage.updateItem(this.account.id, eventID, eventData);

      CollectionLocalStorage.addItem((this.account.id + "-starred"), eventData);

      this.loadStarredEvents();
    },

    unstarEvent: function(eventID) {
      var toUnstarEvent = this.eventsStore.find(eventID);

      if (toUnstarEvent) {
        toUnstarEvent.setAttribute("starred", false);

        var eventData = _.omit(toUnstarEvent.data, "showingComment", "unread");

        CollectionLocalStorage.updateItem(this.account.id, eventID, eventData);
      }

      CollectionLocalStorage.removeItem((this.account.id + "-starred"), eventID);

      this.loadStarredEvents();
    },

    /**
     * This action show the comment to a event at the same time on the
     * starred events tab and the latest events tab.
     */
    showComment: function(eventID) {
      var storesToShowComment = this.findOnBothCollections(eventID),
          eventLoading = EventCommentLoader(storesToShowComment[0].data);

      _.invoke(storesToShowComment, "setAttribute", "showingComment", true);

      eventLoading.done(function(commentData) {
        _.invoke(storesToShowComment, "setAttribute", "comment", commentData);
      });
    },

    hideComment: function(eventID) {
      var storesToHideComment = this.findOnBothCollections(eventID);

      _.invoke(storesToHideComment, "setAttribute", "showingComment", false);
    },

    findOnBothCollections: function(id) {
      var stores = [this.eventsStore.find(id), this.starredEventsStore.find(id)];
      return stores.filter(function(item) { return item; });
    }
  };
});
