define([
  "services/migrator"
], function(
  Migrator
) {

  describe("Migrator", function() {
    beforeEach(function() {
      spyOn(localStorage, "setItem");
    });

    describe("with listened accounts in object", function () {
      beforeEach(function() {
        var legacyListenedAccounts = {
          2030 :{ href: "https://basecamp.com/90/api/v1" }
        };
        spyOn(localStorage, "getItem").andReturn(JSON.stringify(legacyListenedAccounts));
      });

      it("converts in array", function() {
        Migrator();

        expect(localStorage.setItem)
          .toHaveBeenCalledWith(
            "listenedAccounts", JSON.stringify([{ href: "https://basecamp.com/90/api/v1" }])
          );
      });
    });

    describe("with listened accounts in array", function() {
      beforeEach(function() {
        var legacyListenedAccounts = [{ href: "https://basecamp.com/90/api/v1" }];
        spyOn(localStorage, "getItem").andReturn(JSON.stringify(legacyListenedAccounts));
      });

      it("do nothing", function () {
        Migrator();
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    });
  });
});
