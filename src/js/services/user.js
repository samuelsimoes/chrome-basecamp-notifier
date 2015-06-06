define(["services/authenticated_ajax"], function(AuthenticatedAjax) {
  var USER_INFOS_URL = "https://launchpad.37signals.com/authorization.json";

  return {
    getCurrent: function() {
      return JSON.parse(localStorage.getItem("currentUser"));
    },

    currentUserID: function() {
      return this.getCurrent()["identity"].id;
    },

    fetch: function() {
      var promise = AuthenticatedAjax(USER_INFOS_URL);
      promise.done(this.cacheUser);
      return promise;
    },

    clear: function() {
      this.cacheUser();
    },

    cacheUser: function (userData) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
  };
});
