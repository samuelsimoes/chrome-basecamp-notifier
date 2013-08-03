define([
  "services/filter",
  "collections/events",
  "services/configs_ignored_events",
  "models/user"
], function(
  Filter,
  Events,
  ConfigIgnoredEvents,
  User
){
  describe("Filter", function() {

    beforeEach(function() {
      var collection = Backbone.Collection.extend();
      this.collection = new collection([]);
      this.subject = new Filter(this.collection);
    });

    describe("when receive events created by me", function() {
      beforeEach(function() {
        spyOn(User, "current")
          .andReturn(new User({ identity: { first_name: "Samuel", last_name: "Simões" }}));
      });

      it("ignores", function() {
        var nonIgnoredItem = { creator: { name: "Teste Simões" } };

        this.collection.add({ creator: { name: "Samuel Simões" } });
        this.collection.add(nonIgnoredItem);

        expect(this.collection.toJSON()).toEqual([nonIgnoredItem]);
      });
    });

    describe("when receive events with ignored type", function() {
      beforeEach(function() {
        spyOn(ConfigIgnoredEvents, "ignoredEvents")
          .andReturn(["comment"]);
      });

      it("ignores", function() {
        var nonIgnoredItem = { creator: { name: "Teste Simões" }, type: "re_assign_todo" };

        this.collection.add(nonIgnoredItem);
        this.collection.add({ creator: { name: "Teste Simões" }, type: "comment" });

        expect(this.collection.toJSON()).toEqual([nonIgnoredItem]);
      });
    });

    describe("ignore events of ignored projects", function() {
    });
  });
});
