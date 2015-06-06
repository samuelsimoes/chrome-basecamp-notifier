define(["app", "services/user_token", "services/user"], function(App, UserToken, User) {
  return {
    getPermission: function() {
      window.location = App.askForAuthorizationUri;
    },

    authorize: function(authCode) {
      return UserToken.fetch(authCode);
    }
  };
});
