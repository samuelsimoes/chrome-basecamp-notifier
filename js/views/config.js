define([
  "models/user",
  "models/user_token",
  "services/auth",
  "text!templates/configs.html",
  "backbone"
], function(User, UserToken, Auth, ConfigTpl) {

  return Backbone.View.extend({
    el: $(".container"),

    loadingTemplate: _.template("<div class=\"load-view\"><h1>Loading...</h1></div>"),

    configsTemplate: _.template(ConfigTpl),

    render: function() {
      this.resolveAction();
    },

    renderLoadingPage: function() {
      this.$el.html(this.loadingTemplate({}));
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

    renderUserConfigs: function() {
      var that = this;

      User.current().done(function(model){
        that.renderConfigsContent();
      });
    },

    renderConfigsContent: function() {
      this.$el.html(this.configsTemplate({}));
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
