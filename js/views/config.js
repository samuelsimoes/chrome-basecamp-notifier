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
      var that = this;

      this.renderLoadingPage();

      if (this.returningFromPermissionScreen()) {
        Auth.authorize(this.authCode).done(function(){
          that.renderUserConfigs();
        });
      } else if (UserToken.current() == undefined) {
        Auth.getPermission();
      } else {
        this.renderUserConfigs();
      }
    },

    fetchUser: function() {
      var userPromisse = User.current();

      userPromisse.done(function(model){
        console.log(model);
        console.log("Carregou o usuário");
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
