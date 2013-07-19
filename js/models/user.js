BasecampNotifier.User = Backbone.Model.extend({
  url: "https://launchpad.37signals.com/authorization.json",
}, {

  currentUser: function() {
    var user = new BasecampNotifier.User();

    user.fetch({ cache: true, prefill: false });

    return user;
  },

  currentToken: function() {
    var token = new BasecampNotifier.UserToken();

    token.fetch({ cache: true, prefill: false });

    return token;
  },

  authenticate: function() {
    window.location = BasecampNotifier.authorizationUri;
  },

  fetchNewToken: function(authCode) {
    Backbone.fetchCache.clearItem("UserToken");

    var token = new BasecampNotifier.UserToken({ auth_code: authCode });

    return token.fetch({
      type: "POST",
      cache: true,
      prefill: false
    });
  },

  fetchUser: function() {
    if (!BasecampNotifier.User.loggedIn()) { return; }

    var token = BasecampNotifier.User.currentToken();
    var user = new BasecampNotifier.User({ token: token.get("access_token") });

    return user.fetch({
      cache: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', ("Bearer " + token.get("access_token")));
      }
    });
  },

  loggedIn: function() {
    return (Backbone.fetchCache._cache.UserToken != undefined);
  },

  modelType: "User"
});
