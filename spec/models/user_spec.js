define(["models/user"], function(User){
  describe("User", function() {
    beforeEach(function() {
      this.user = new User({
        "identity": {"last_name":"Simões", "first_name":"Samuel"}
      });
    });

    describe("name functions", function() {
      it("#partialFullName returns full name", function() {
        expect(this.user.partialFullName()).toEqual("Samuel S.");
      });

      it("#fullName returns full name", function() {
        expect(this.user.fullName()).toEqual("Samuel Simões");
      });
    });

    describe("#current", function() {
      beforeEach(function () {
        this.subject = User;
      });

      describe("with previous memory cache", function () {
        beforeEach(function () {
          spyOn(chrome.extension, "getBackgroundPage").andReturn({ currentUser: this.user });
        });

        it("return the instance from cache", function () {
          expect(this.subject.current()).toEqual(this.user);
        });
      });

      describe("without previous memory cache", function () {
        beforeEach(function () {
          spyOn(chrome.extension, "getBackgroundPage").andReturn({ currentUser: undefined });
          spyOn(localStorage, "getItem").andReturn(JSON.stringify(this.user.toJSON()));
        });

        it("return the instance from localstorage cache", function () {
          var userJson = this.user.toJSON();
          expect(this.subject.current().toJSON()).toEqual(userJson);
          expect(chrome.extension.getBackgroundPage().currentUser.toJSON()).toEqual(userJson);
          expect(localStorage.getItem).toHaveBeenCalledWith("currentUser");
        });
      });
    });
  });
});
