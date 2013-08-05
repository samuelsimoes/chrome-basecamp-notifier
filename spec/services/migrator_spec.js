define([
  "services/migrator"
], function(
  Migrator
) {

  describe("Migrator", function() {
    beforeEach(function() {
      spyOn(localStorage, "setItem");
      spyOn(localStorage, "removeItem").andReturn(true);
    });

    describe("#migrate", function() {
      describe("with legacy keys", function() {
        beforeEach(function() {
          var legacyKeys = {
            listenedAccounts:{
              90:{ href: "https://basecamp.com/90/api/v1" }
            },
            ignoredEvents:["rescheduled_event"]
          };

          spyOn(localStorage, "getItem").andReturn(JSON.stringify(legacyKeys));
        });

        it ("migrate the past configs", function() {
          Migrator();

          expect(localStorage.setItem)
            .toHaveBeenCalledWith(
              "listenedAccounts",
              JSON.stringify({
                90:{ href: "https://basecamp.com/90/api/v1" }
              })
            );

          expect(localStorage.setItem)
            .toHaveBeenCalledWith(
              "ignoredEvents",
              JSON.stringify(["rescheduled_event"])
            );

          expect(localStorage.removeItem)
            .toHaveBeenCalledWith("configs");
        });
      });

      describe("without legacy keys", function() {
        beforeEach(function() {
          spyOn(localStorage, "getItem").andCallFake(function(key) {
            if(key=="configs") {
              return undefined;
            };
          });
        });

        it ("do nothing", function() {
          Migrator();

          expect(localStorage.setItem).not.toHaveBeenCalled();
        });
      });
    });
  });
});
