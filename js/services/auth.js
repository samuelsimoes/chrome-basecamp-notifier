define(["app", "models/user_token", "models/user"], function(App, UserToken, User) {
  module = {};

  var persistToken = function(token) {
    return localStorage.setItem("currentToken", token);
  };

  var persistCurrentUser = function(user) {
    localStorage.setItem("currentUser", JSON.stringify(user.toJSON()));
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
    var promise = $.Deferred()
    var tokenPromise = getToken(authCode);

    tokenPromise.done(function(token){
      var userPromise = User.fetchCurrentUser();

      userPromise.done(function(user){
        persistCurrentUser(user);
        promise.resolve(token);
      });
    });

    return promise.promise();
  };

  return module;
});
