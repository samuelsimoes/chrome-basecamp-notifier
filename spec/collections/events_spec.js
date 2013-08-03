define(["collections/events"], function(Events){
  describe("Events", function() {
    beforeEach(function(){
      this.subject = function() {
        return new Events(this.models, {
          account: this.account,
          userToken: this.userToken
        });
      }

      this.account = {};
      this.account.get = jasmine.createSpy().andCallFake(function(id) {
        return 20;
      });

      this.userToken = {};
      this.userToken.current = jasmine.createSpy().andCallFake(function() {
        return "20ab";
      });

      this.models = [];
    });

    describe("fetching", function(){
      beforeEach(function(){
        /*spyOn($, "ajax").andCallFake(function(options) {
          options.success([]);
        });*/
      });

      it("#fetchAuthorized with correct header", function() {
        var spy = spyOn(XMLHttpRequest.prototype, "setRequestHeader");
        this.subject().fetchAuthorized();
        expect(spy.mostRecentCall.args).toEqual(["Authorization", "Bearer 20ab"]);
      });
    });

    it("should have the correct URL based in account", function(){
      expect(this.subject().url).toEqual("https://basecamp.com/20/api/v1/events.json");
    });

    describe("with some models", function() {
      beforeEach(function(){
        this.models = [
          { id: 20, created_at: "2013-07-31T21:03:45.000-02:00" },
          { id: 30, created_at: "2013-07-31T22:03:45.000-02:00" }
        ]
      });

      it("return the records in desc order date", function() {
        expect(_.pluck(this.subject().toJSON(), "id")).toEqual([30, 20]);
      });

      xit("correctly persist the cache", function() {
      });

      describe("and some previous cache", function() {
        xit("correctly fetch from cache", function() {
        });
      });
    });

    xit("streams", function() {
    });
  });
});
