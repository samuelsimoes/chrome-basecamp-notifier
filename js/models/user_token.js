define(["app", "backbone", "backbone.deferred"], function(App) {
  return Backbone.DeferredModel.extend({
    url: function() {
      return "https://launchpad.37signals.com/authorization/token?client_id="
              + App.clientId +
              "&redirect_uri="
              + encodeURIComponent(App.redirectUri) +
              "&client_secret="
              + App.clientSecret +
              "&type=web_server&code=" + this.get("auth_code");
    },

    cacheToken: function() {
      return localStorage.setItem("currentToken", this.get("access_token"));
    }
  }, {
    current: function() {
      return localStorage.getItem("currentToken");
    }
  });
});
