define([
  "services/configs_listened_accounts"
], function(
  ConfigListenedAccounts
){

  describe("ConfigListenedAccounts", function() {
    beforeEach(function() {
      spyOn(localStorage, "setItem");

      this.account = jasmine.createSpyObj("account", ["getId", "toJSON"]);
      this.account.getId.andReturn(1);
      this.account.toJSON.andReturn({ id: 1 });
    });

    describe("without listened account", function () {
      beforeEach(function() {
        spyOn(localStorage, "getItem")
          .andReturn(JSON.stringify([]));
      });

      it("#isListened returns false", function () {
        expect(ConfigListenedAccounts.isListened(this.account))
          .toBe(false);
      });

      it("#toggle insert account in array of listened accounts", function () {
        ConfigListenedAccounts.toggle(this.account);

        expect(localStorage.setItem)
          .toHaveBeenCalledWith(
            "listenedAccounts", JSON.stringify([{ id: 1 }])
          );
      });
    });

    describe("with listened account", function () {
      beforeEach(function() {
        spyOn(localStorage, "getItem")
          .andReturn(JSON.stringify([{ id: 1 }]));
      });

      it("#isListened returns true", function () {
        expect(ConfigListenedAccounts.isListened(this.account))
          .toBe(true);
      });

      it("#toggle remove account of array of listened accounts", function () {
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    });
  });
});
