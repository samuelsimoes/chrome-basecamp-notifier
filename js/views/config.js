define([
  "models/user",
  "models/user_token",
  "services/auth",
  "backbone",
  "ejs"
], function(User, UserToken, Auth) {

  return Backbone.View.extend({
    el: $("#main-content"),

    loadingTemplate: function() { return new EJS({ url: "/js/templates/configs/loading.ejs" }); },

    render: function() {
      this.resolveAction();
    },

    renderLoadingPage: function() {
      this.$el.html(this.loadingTemplate().render({}));
    },

    resolveAction: function() {
      if (this.returningFromPermissionScreen()) {
        this.fetchUser();
      } else if (UserToken.current() == undefined) {
        Auth.getPermission();
      } else {
        var userPromisse = User.current();

        userPromisse.done(function(model){
          console.log(model);
        });
      }
    },

    fetchUser: function() {
      var tokenPromise = Auth.authorize(this.authCode);

      tokenPromise.done(function() {
        var userPromisse = User.current();

        userPromisse.done(function(model){
          console.log(model);
        });
      });
    },

    returningFromPermissionScreen: function() {
      var authCode = location.search.match(/\?code\=([^\&]+)/);

      if (authCode != undefined) {
        this.authCode = authCode[1];
        return true;
      } else {
        return false;
      }
    }
  });
});
