define(["services/unread_events_cache"], function(UnreadEvents){
  describe("UnreadEvents", function() {
    beforeEach(function(){
      this.eventItem = jasmine.createSpyObj("account", ["getId"]);
      this.eventItem.getId.andReturn(90);
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
          UnreadEvents.addItem(this.eventItem);

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
          UnreadEvents.addItem(this.eventItem);

          expect(UnreadEvents.unreadItems()).toEqual([30, 40, 90]);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith("unreadEvents", JSON.stringify([30, 40, 90]));

          expect(chrome.extension.getBackgroundPage().unreadEventsCache)
            .toEqual([30,40,90]);
        });

        it ("#markAsRead remove item from unread cache", function () {
          UnreadEvents.addItem(this.eventItem);

          UnreadEvents.markAsRead(this.eventItem);

          expect(UnreadEvents.unreadItems()).toEqual([30, 40]);

          expect(chrome.extension.getBackgroundPage().unreadEventsCache)
            .toEqual([30,40]);
        });

        it ("#unredItemsCount", function () {
          expect(UnreadEvents.unredItemsCount()).toEqual(2);
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
        UnreadEvents.addItem(this.eventItem);

        expect(localStorage.setItem)
          .toHaveBeenCalledWith("unreadEvents", JSON.stringify([90]));
      });
    });
  });
});
