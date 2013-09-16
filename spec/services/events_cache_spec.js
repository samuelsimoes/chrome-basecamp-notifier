define([
  "services/events_cache",
  "services/configs_listened_accounts"
], function(
  EventsCache,
  ConfigListenedAccounts
){
  describe("EventsCache", function() {
    beforeEach(function() {
      spyOn(localStorage, "setItem");
    });

    describe("with previous cache", function() {
      beforeEach(function() {
        spyOn(localStorage, "getItem")
          .andReturn(JSON.stringify([{ id: 10 }]));
      });

      it("#get works correctly", function () {
        expect(EventsCache.get("chave")).toEqual([{ id: 10 }]);
      });

      describe("#update", function () {
        it("when receive empty array works correctly", function () {
          EventsCache.update("chave", []);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith(
              "chave", JSON.stringify([{ id: 10 }])
            );
        });

        it("when receive an array with items works correctly", function () {
          EventsCache.update("chave", [{ id: 20 }]);

          expect(localStorage.setItem)
            .toHaveBeenCalledWith(
              "chave", JSON.stringify([{ id: 20 }, { id: 10 }])
            );
        });
      });
    });

    describe("without previous cache", function() {
      beforeEach(function() {
        spyOn(localStorage, "getItem")
          .andReturn(undefined);
      });

      it("#get", function () {
        expect(EventsCache.get("chave")).toEqual([]);
      });
    });
  });
});
