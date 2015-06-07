define(["services/authenticated_ajax"], function(AuthenticatedAjax) {
  var USER_INFOS_URL = "https://launchpad.37signals.com/authorization.json";

  return {
    getCurrent: function() {
      if (!this.current) {
        this.current = JSON.parse(localStorage.getItem("currentUser"));
      }

      return this.current;
    },

    currentUserName: function() {
      return (this.getCurrent().identity.first_name + " " + this.getCurrent().identity.last_name);
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
