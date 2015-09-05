import { Fluxo } from "libs";
import EventType from "services/event_type";
import ArrayLocalStorage from "services/array_local_storage";

export default Fluxo.Store.extend({
  computed: {
    typeInfos: ["change:action"],
    isComment: ["change:typeInfos"],
    icon: ["change:typeInfos"],
    creatorImage: ["change:creator"],
    creatorName: ["change:creator"],
    bucketName: ["change:bucket"],
    unread: []
  },

  unread: function() {
    return ArrayLocalStorage.include("unreadEvents", this.data.id);
  },

  typeInfos: function() {
    return EventType.discoverAndGetInfos(this.data.action);
  },

  isComment: function() {
    return this.data.typeInfos.key === "comment";
  },

  icon: function() {
    return this.data.typeInfos.icon;
  },

  creatorImage: function() {
    return this.data.creator.avatar_url;
  },

  creatorName: function() {
    return this.data.creator.name;
  },

  bucketName: function() {
    return this.data.bucket.name;
  },

  star: function() {
    this.setAttribute("starred", true);
  },

  unstar: function() {
    this.setAttribute("starred", false);
  },

  setComment: function(commentData) {
    this.setAttribute("comment", commentData);
  },

  setCommentLoadError: function(commentErrorLoading) {
    this.setAttribute("commentErrorLoading", commentErrorLoading);
  }
});
