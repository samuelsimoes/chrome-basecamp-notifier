import { _ } from "libs";
import ArrayLocalStorage from "services/array_local_storage";
import EventsCache from "services/events_cache";
import EventCommentLoader from "services/event_comment_loader";

export default {
  initialize: function (events, starredEvents, accountID) {
    this.events = events;
    this.starredEvents = starredEvents;
    this.accountID = accountID;

    this.starredEvents.resetFromData(EventsCache.getStarred(this.accountID));
    this.events.resetFromData(EventsCache.get(this.accountID));
  },

  starEvent: function(eventID) {
    var store = this.events.find(eventID);

    store.star();

    var eventData = _.omit(store.data, "showingComment");

    this.starredEvents.addFromData(eventData);

    EventsCache.storeStarred(this.accountID, eventData);
  },

  unstarEvent: function(eventID) {
    var starredStore = this.starredEvents.find(eventID),
        store = this.events.find(eventID);

    if (store) {
      store.unstar();
    }

    starredStore.unstar();

    this.starredEvents.remove(starredStore);

    EventsCache.removeStarred(this.accountID, eventID);
  },

  /**
   * This action show the comment to a event at the same time on the
   * starred events tab and the latest events tab.
   */
  showComment: function(eventID) {
    var storesToShowComment = this.findOnBothCollections(eventID),
        eventLoading = EventCommentLoader(storesToShowComment[0].data);

    _.invoke(storesToShowComment, "setAttribute", "showingComment", true);

    eventLoading.then(function(request) {
      _.invoke(storesToShowComment, "setAttribute", "comment", request.response);
    }, function(request) {
      var errorLoading;

      if (request.deleted) {
        errorLoading = "Can't fetch the comment. Maybe it was deleted.";
      } else {
        errorLoading = "Can't fetch the comment, try again.";
      }

      _.invoke(storesToShowComment, "setAttribute", "commentErrorLoading", errorLoading);
    });
  },

  clearLastEvents: function() {
    EventsCache.clear(this.accountID);
    this.events.removeAll();
  },

  hideComment: function(eventID) {
    var storesToHideComment = this.findOnBothCollections(eventID);

    _.invoke(storesToHideComment, "setAttribute", "commentErrorLoading", null);

    _.invoke(storesToHideComment, "setAttribute", "showingComment", false);
  },

  findOnBothCollections: function(id) {
    var stores = [this.events.find(id), this.starredEvents.find(id)];
    return stores.filter(function(item) { return item; });
  }
};
