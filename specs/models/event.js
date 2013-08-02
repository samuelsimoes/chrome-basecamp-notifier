define([
  "models/event",
  "services/unread_events_cache"
], function(
  Event,
  UnreadEventsCache
){

  describe("Event", function() {
    describe("feteched event", function() {
      beforeEach(function() {
        this.subject = function() {
          return new Event({ id: 302, action: "re-assigned a to-do" })
        };
      });

      describe("unread event", function() {
        beforeEach(function() {
          spyOn(UnreadEventsCache, "unreadItems").andReturn([302]);
        });

        it("should be signed as unread", function() {
          expect(this.subject().viewed()).toBe(false);
        });
      });

      describe("read event", function() {
        beforeEach(function() {
          spyOn(UnreadEventsCache, "unreadItems").andReturn([]);
        });

        it("should be signed as unread", function() {
          expect(this.subject().viewed()).toBe(true);
        });
      });
    });
  });
});
