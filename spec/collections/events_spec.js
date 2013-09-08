define(["collections/events"], function(Events){
  describe("Events", function() {
    beforeEach(function(){
      this.subject = function() {
        return new Events(this.models, {
          account: this.account,
          userToken: this.userToken
        });
      }

      this.account = jasmine.createSpyObj("account", ["getId"]);
      this.account.getId.andReturn(20);

      this.userToken = jasmine.createSpyObj("userToken", ["current"]);
      this.userToken.current.andReturn("20ab");

      this.models = [];
    });

    describe("fetching", function(){
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
