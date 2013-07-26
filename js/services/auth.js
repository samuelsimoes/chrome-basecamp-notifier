define(["app", "models/user_token", "models/user"], function(App, UserToken, User) {
  module = {};

  var getToken = function(authCode) {
    var token = new UserToken({ auth_code: authCode });
    var tokenPromise = token.fetch({ type: "POST" });

    tokenPromise.done(function(model) {
      model.cacheToken();
    });

    return tokenPromise;
  };

  module.getPermission = function() {
    window.location = App.askForAuthorizationUri;
  };

  module.authorize = function(authCode) {
    var promise = $.Deferred()
    var tokenPromise = getToken(authCode);

    tokenPromise.done(function(token){
      var userPromise = User.fetchCurrentUser();

      userPromise.done(function(user){
        promise.resolve(token, user);
      });

      // Case don't properly fetch user rollback
      userPromise.fail(function(user){
        localStorage.removeItem("currentToken")
        promise.reject();
      });
    });

    tokenPromise.fail(function() {
      promise.reject();
    });

    return promise.promise();
  };

  return module;
});
