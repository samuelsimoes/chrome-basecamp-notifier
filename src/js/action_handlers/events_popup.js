define([
  "services/array_local_storage",
  "services/events_cache",
  "services/events_filter",
  "services/event_comment_loader"
], function(
  ArrayLocalStorage,
  EventsCache,
  EventsFilter,
  EventCommentLoader
) {
  var MAX_EVENTS_ON_LIST = 40;

  return {
    initialize: function (eventsStore, starredEventsStore, account) {
      this.eventsStore = eventsStore;
      this.starredEventsStore = starredEventsStore;
      this.account = account;

      this.starredEventsCache = EventsCache.getStarred(this.account.id);
      this.eventsCache = EventsCache.get(this.account.id);

      this._loadEvents();
      this._loadStarredEvents();
    },

    _loadEvents: function() {
      var starredEventsItemIDs = this.starredEventsCache.map(function(item) { return item.id; });

      this.eventsCache.forEach(function(item) {
        item.unread = ArrayLocalStorage.include("unreadEventsIDs", item.id);
        item.starred = _.include(starredEventsItemIDs, item.id);

        if (item.unread) {
          ArrayLocalStorage.remove("unreadEventsIDs", item.id);
        }
      });

      this.eventsStore.resetFromData(this.eventsCache);
    },

    _loadStarredEvents: function() {
      this.starredEventsStore.resetFromData(this.starredEventsCache);
    },

    starEvent: function(eventID) {
      var toStarEvent = this.eventsStore.find(eventID);

      toStarEvent.setAttribute("starred", true);

      var eventData = _.omit(toStarEvent.data, "showingComment");

      this.starredEventsStore.addFromData(eventData);

      EventsCache.storeStarred(this.account.id, eventData);
    },

    unstarEvent: function(eventID) {
      var toUnstarEvent = this.eventsStore.find(eventID);

      if (toUnstarEvent) {
        toUnstarEvent.setAttribute("starred", false);
      }

      this.starredEventsStore.remove(this.starredEventsStore.find(eventID));

      EventsCache.removeStarred(this.account.id, eventID);
    },

    /**
     * This action show the comment to a event at the same time on the
     * starred events tab and the latest events tab.
     */
    showComment: function(eventID) {
      var storesToShowComment = this.findOnBothCollections(eventID),
          eventLoading = EventCommentLoader(storesToShowComment[0].data);

      _.invoke(storesToShowComment, "setAttribute", "showingComment", true);

      eventLoading.then(function(commentData) {
        _.invoke(storesToShowComment, "setAttribute", "comment", commentData);
      }, function(xhr) {
        var errorLoading;

        if (xhr.deleted) {
          errorLoading = "Can't fetch the comment. Maybe it was deleted.";
        } else {
          errorLoading = "Can't fetch the comment, try again.";
        }

        _.invoke(storesToShowComment, "setAttribute", "commentErrorLoading", errorLoading);
      });
    },

    clearLastEvents: function() {
      EventsCache.clear(this.account.id);
      this.eventsStore.removeAll();
    },

    hideComment: function(eventID) {
      var storesToHideComment = this.findOnBothCollections(eventID);

      _.invoke(storesToHideComment, "setAttribute", "commentErrorLoading", null);

      _.invoke(storesToHideComment, "setAttribute", "showingComment", false);
    },

    findOnBothCollections: function(id) {
      var stores = [this.eventsStore.find(id), this.starredEventsStore.find(id)];
      return stores.filter(function(item) { return item; });
    }
  };
});
