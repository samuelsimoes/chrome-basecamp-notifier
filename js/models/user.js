define(["models/user_token", "backbone", "backbone.deferred"], function(UserToken) {
  return Backbone.DeferredModel.extend({
    initialize: function() {
      var identity = this.get("identity");
      this.set("full_name", identity.first_name + " " + identity.last_name[0]);
    },
    url: function() {
      return "https://launchpad.37signals.com/authorization.json";
    }
  }, {
    fetchCurrentUser: function() {
      var user = new this();

      return user.fetch({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + UserToken.current()));
        }
      });
    },

    current: function() {
      var cachedUser = JSON.parse(localStorage.getItem("currentUser"));
      var user = new this(cachedUser);
      return user;
    }
  });
});
