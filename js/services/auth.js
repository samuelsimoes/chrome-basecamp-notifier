define(["app", "models/user_token"], function(App, UserToken) {
  module = {};

  var persistToken = function(token) {
    return localStorage.setItem("currentToken", token);
  };

  var persistCurrentUserId = function(userId) {
    return localStorage.setItem("currentUserId", userId);
  };

  var getToken = function(authCode) {
    var token = new UserToken({ auth_code: authCode });
    var tokenPromise = token.fetch({ type: "POST" });

    tokenPromise.done(function(model) {
      persistToken(model.get("access_token"));
    });

    return tokenPromise;
  };

  module.getPermission = function() {
    window.location = App.askForAuthorizationUri;
  };

  module.authorize = function(authCode) {
    return getToken(authCode);
  };

  return module;
});
