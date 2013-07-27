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
  });
});
