define([
  "services/array_local_storage",
  "services/events_filter",
  "services/event_comment_loader"
], function(
  ArrayLocalStorage,
  EventsFilter,
  EventCommentLoader
) {
  var MAX_EVENTS_ON_LIST = 40;

  return {
    initialize: function (eventsStore, starredEventsStore, account) {
      this.eventsStore = eventsStore;
      this.starredEventsStore = starredEventsStore;
      this.account = account;

      this.starredEventsCache = ArrayLocalStorage.getAll((this.account.id + "-starred"));
      this.eventsCache = ArrayLocalStorage.getAll(this.account.id);

      this._loadEvents();
      this._loadStarredEvents();
    },

    _loadEvents: function() {
      var eventsCache = this.eventsCache.reverse().slice(0, MAX_EVENTS_ON_LIST),
          filteredCache = EventsFilter(eventsCache, this.account.id),
          starredEventsItemIDs = this.starredEventsCache.map(function(item) { return item.id; });

      filteredCache.forEach(function(item) {
        item.unread = ArrayLocalStorage.include("unreadEventsIDs", item.id);
        item.starred = _.include(starredEventsItemIDs, item.id);

        if (item.unread) {
          ArrayLocalStorage.remove("unreadEventsIDs", item.id);
        }
      });

      this.eventsStore.resetFromData(filteredCache);
    },

    _loadStarredEvents: function() {
      this.starredEventsStore.resetFromData(this.starredEventsCache.reverse());
    },

    starEvent: function(eventID) {
      var toStarEvent = this.eventsStore.find(eventID);

      toStarEvent.setAttribute("starred", true);

      var eventData = _.omit(toStarEvent.data, "showingComment");

      this.starredEventsStore.addFromData(eventData);

      ArrayLocalStorage.add((this.account.id + "-starred"), eventData);
    },

    unstarEvent: function(eventID) {
      var toUnstarEvent = this.eventsStore.find(eventID);

      if (toUnstarEvent) {
        toUnstarEvent.setAttribute("starred", false);
      }

      this.starredEventsStore.remove(this.starredEventsStore.find(eventID));

      ArrayLocalStorage.removeByID((this.account.id + "-starred"), eventID);
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
