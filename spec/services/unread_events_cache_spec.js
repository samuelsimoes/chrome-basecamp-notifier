define(["services/unread_events_cache"], function(UnreadEvents){
  describe("UnreadEvents", function() {
    beforeEach(function(){
      spyOn(localStorage, "setItem");
    });

    describe("with previous persisted cache", function() {
      beforeEach(function() {
        spyOn(localStorage, "getItem").andReturn(JSON.stringify([30, 40]));
      });

      describe("without previous memory cache", function() {
        beforeEach(function() {
          spyOn(chrome.extension, "getBackgroundPage").andReturn({ unreadEventsCache: undefined });
        });

        it("should returns the correct persited values", function(){
          expect(UnreadEvents.unreadItems()).toEqual([30, 40]);
        });

        it("should append a new value", function() {
          UnreadEvents.addItem(90);

          expect(UnreadEvents.unreadItems()).toEqual([30, 40, 90]);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith("unreadEvents", JSON.stringify([30, 40, 90]));

          expect(chrome.extension.getBackgroundPage().unreadEventsCache)
            .toEqual([30,40,90]);
        });

        it("#clear should clear the cache", function(){
          UnreadEvents.clear();

          expect(UnreadEvents.unreadItems()).toEqual([]);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith("unreadEvents", JSON.stringify([]));
        });
      });

      describe("with previous memory cache", function() {
        beforeEach(function() {
          spyOn(chrome.extension, "getBackgroundPage").andReturn({ unreadEventsCache: [30, 40] });
        });

        it("should returns the correct persited values via cache", function(){
          expect(UnreadEvents.unreadItems()).toEqual([30, 40]);
        });

        it("should append a new value", function() {
          UnreadEvents.addItem(90);

          expect(UnreadEvents.unreadItems()).toEqual([30, 40, 90]);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith("unreadEvents", JSON.stringify([30, 40, 90]));

          expect(chrome.extension.getBackgroundPage().unreadEventsCache)
            .toEqual([30,40,90]);
        });

        it("#clear should clear the cache", function(){
          UnreadEvents.clear();

          expect(localStorage.setItem)
            .toHaveBeenCalledWith("unreadEvents", JSON.stringify([]));

          expect(chrome.extension.getBackgroundPage().unreadEventsCache)
            .toEqual([]);
        });
      });
    });

    describe("without persisted previous cache", function() {
      beforeEach(function() {
        spyOn(localStorage, "getItem").andReturn(undefined);
        spyOn(chrome.extension, "getBackgroundPage").andReturn({ unreadEventsCache: undefined });
      });

      it("returns a empty array", function() {
        expect(UnreadEvents.unreadItems()).toEqual([]);
      });

      it("should append a new value", function() {
        UnreadEvents.addItem(90);

        expect(localStorage.setItem)
          .toHaveBeenCalledWith("unreadEvents", JSON.stringify([90]));
      });
    });
  });
});
