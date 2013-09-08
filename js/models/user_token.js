define(["app", "backbone", "backbone.deferred"], function(App) {
  return Backbone.DeferredModel.extend({
    initialize: function (attrs, options) {
      this.options = (options != undefined) ? options : {};
    },

    url: function() {
      if (this.options.mode != undefined && this.options.mode == "refresh") {
        return "https://launchpad.37signals.com/authorization/token";
      } else {
        return this.newTokenUrl();
      }
    },

    newTokenUrl: function () {
      return "https://launchpad.37signals.com/authorization/token?client_id="
            + App.clientId +
            "&redirect_uri="
            + encodeURIComponent(App.redirectUri) +
            "&client_secret="
            + App.clientSecret +
            "&type=web_server&code=" + this.get("auth_code");
    },

    cacheToken: function() {
      localStorage.setItem("currentToken", this.get("access_token"));

      if (this.get("refresh_token") != undefined) {
        localStorage.setItem("refreshToken", this.get("refresh_token"));
      }
    },

    refresh: function () {
      var that = this;
      this.unset("code");

      this.set({
        type: "refresh",
        client_id: App.clientId,
        client_secret: App.clientSecret,
        refresh: this.get("refresh_token"),
        redirect_uri: encodeURIComponent(App.redirectUri)
      });

      return this.save();
    }
  }, {
    currentRefresh: function () {
      var currentToken = new this({
        access_token: localStorage.getItem("currentToken"),
        refresh_token: localStorage.getItem("refreshToken")
      }, { mode: "refresh" });

      var newTokenPromise = currentToken.refresh();

      newTokenPromise.done(function (model) {
        model.cacheToken();
      });

      return newTokenPromise;
    },

    current: function() {
      return localStorage.getItem("currentToken");
    }
  });
});
