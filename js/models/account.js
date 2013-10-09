define([
  "collections/projects",
  "collections/events",
  "collections/starred_events",
  "backbone"
], function(
  Projects,
  Events,
  StarredEvents
) {

  return Backbone.Model.extend({
    getId: function () {
      return this.get("id");
    },

    getName: function () {
      return this.get("name");
    },

    getProjects: function () {
      if (this.projects == undefined) {
        this.projects = new Projects({}, { account: this });
      }

      return this.projects;
    },

    getEventsFromCache: function (attribute) {
      var eventsCollection = new Events([], { account: this });
      return eventsCollection.fetchCached();
    },

    getStarredEvents: function () {
      var starredEvents = new StarredEvents([], { account: this });
      return starredEvents.fetch();
    }
  });
});
