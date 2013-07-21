define(["models/account", "backbone"], function(Account) {
  return Backbone.Collection.extend({
    model: Account
  });
});
