import { _ } from "libs";
import ArrayLocalStorage from "services/array_local_storage";
import EventsCache from "services/events_cache";
import EventCommentLoader from "services/event_comment_loader";
import EventCommentLoadingFeedback from "services/event_comment_loading_feedback";

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

    EventsCache.storeStarred(this.accountID, store.data);

    ArrayLocalStorage.add("starredEvents", eventID);

    this.starredEvents.addFromData(store.data);
  },

  unstarEvent: function(eventID) {
    var starredStore = this.starredEvents.find(eventID),
        store = this.events.find(eventID);

    if (store) {
      store.unstar();
    }

    EventsCache.removeStarred(this.accountID, eventID);

    ArrayLocalStorage.remove("starredEvents", eventID);

    this.starredEvents.remove(starredStore);
  },

  loadComment: function(eventID, tabName) {
    var store = this[tabName].find(eventID),
        eventLoading = EventCommentLoader(store.data);

    EventCommentLoadingFeedback(eventLoading, store);
  },

  clearLastEvents: function() {
    EventsCache.clear(this.accountID);
    this.events.removeAll();
  }
};
