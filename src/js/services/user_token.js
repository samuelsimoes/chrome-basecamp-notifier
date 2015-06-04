define(["app", "jquery", "underscore"], function(App, $, _) {
  var AUTHORIZATION_TOKEN_URL = "https://launchpad.37signals.com/authorization/token";

  return {
    current: function() {
      return localStorage.getItem("currentToken");
    },

    learCurrentCredentials: function() {
      localStorage.clearItem("currentToken");
      localStorage.clearItem("refreshToken");
    },

    fetch: function(authCode) {
      var tokenPromise = this.tokenRequest({
        code: authCode,
        type: "web_server"
      });

      tokenPromise.done(this.cacheToken);

      return tokenPromise;
    },

    refresh: function() {
      var tokenPromise = this.tokenRequest({
        refresh: localStorage.getItem("refreshToken"),
        type: "refresh"
      });

      tokenPromise.done(this.cacheToken);

      return tokenPromise;
    },

    cacheToken: function(data) {
      localStorage.setItem("currentToken", data.access_token);

      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }
    },

    tokenRequest: function(options) {
      _.defaults(options, {
        client_id: App.clientId,
        redirect_uri: App.redirectUri,
        client_secret: App.clientSecret
      });

      return $.ajax({
        url: AUTHORIZATION_TOKEN_URL,
        method: "post",
        data: options
      });
    }
  };
});
