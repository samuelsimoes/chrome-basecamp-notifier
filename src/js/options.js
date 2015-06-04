define([
  "services/user_token",
  "models/user",
  "services/auth",
  "views/config/base"
], function(
  UserToken,
  User,
  Auth,
  ConfigBaseView
) {

  module = {};

  module.returningFromPermissionScreen = function() {
    var authCode = location.search.match(/\?code\=([^\&]+)/);

    if (authCode) {
      this.authCode = authCode[1];
      return true;
    } else {
      return false;
    }
  };

  module.resolveAuthThings = function() {
    var auth = Auth.authorize(this.authCode);

    auth.done(_.bind(module.configView.render, module.configView));

    auth.fail(function(){
      alert("Error on load user, please try again.");
      module.configView.close();
    });
  };

  module.mediate = function() {
    this.configView = new ConfigBaseView();

    if (this.returningFromPermissionScreen()) {
      this.resolveAuthThings();
    } else if (!UserToken.current()) {
      Auth.getPermission();
    } else {
      User.fetchCurrentUser().done(function(user) {
        module.configView.render(user);
      });

      User.fetchCurrentUser().fail(function () {
        alert("Could not load your user information, please authorize the app again.");
        UserToken.clearCurrentCredentials();
        Auth.getPermission();
      });
    }
  }

  module.mediate();
});
