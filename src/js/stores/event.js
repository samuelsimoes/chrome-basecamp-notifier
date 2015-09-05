import { Fluxo } from "libs";
import EventType from "services/event_type";

export default Fluxo.Store.extend({
  computed: {
    typeInfos: ["change:action"],
    isComment: ["change:typeInfos"],
    icon: ["change:typeInfos"],
    creatorImage: ["change:creator"],
    creatorName: ["change:creator"],
    bucketName: ["change:bucket"]
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
  }
});
