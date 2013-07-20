define(["models/user_token", "backbone", "backbone.deferred"], function(UserToken) {
  return Backbone.DeferredModel.extend({
    url: function() {
      return "https://launchpad.37signals.com/authorization.json";
    }
  }, {
    current: function() {
      var user = new this();

      return user.fetch({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + UserToken.current()));
        }
      });
    }
  });
});
