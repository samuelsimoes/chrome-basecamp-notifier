define(["app", "services/user_token", "models/user"], function(App, UserToken, User) {
  return {
    getPermission: function() {
      window.location = App.askForAuthorizationUri;
    },

    authorize: function(authCode) {
      var authPromise = $.Deferred(),
          tokenPromise = UserToken.fetch(authCode);

      tokenPromise.done(function() {
        var userPromise = User.fetchCurrentUser();

        userPromise.done(authPromise.resolve);

        userPromise.fail(function(user) {
          UserToken.clearCurrentCredentials();
          authPromise.reject();
        });
      });

      tokenPromise.fail(authPromise.reject);

      return authPromise.promise();
    }
  };
});
