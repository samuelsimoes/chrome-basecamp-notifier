define(["models/user_token", "backbone", "backbone.deferred"], function(UserToken) {
  return Backbone.DeferredModel.extend({
    url: function() {
      return "https://launchpad.37signals.com/authorization.json";
    },

    partialFullName: function() {
      var identity = this.get("identity");
      return identity.first_name + " " + identity.last_name[0] + ".";
    },

    fullName: function() {
      var identity = this.get("identity");
      return identity.first_name + " " + identity.last_name;
    },

    cacheUser: function() {
      localStorage.setItem("currentUser", JSON.stringify(this.toJSON()));
    }
  }, {
    fetchCurrentUser: function() {
      var user = new this();
      var userPromise = user.fetch({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', ("Bearer " + UserToken.current()));
        }
      });

      userPromise.done(function(model){
        user.cacheUser();
      });

      return userPromise;
    },

    current: function() {
      if(chrome.extension.getBackgroundPage().currentUser == undefined) {
        var cachedUser = JSON.parse(localStorage.getItem("currentUser"));
        var user = new this(cachedUser);

        chrome.extension.getBackgroundPage().currentUser = user;
      } else {
        var user = chrome.extension.getBackgroundPage().currentUser;
      }

      return user;
    }
  });
});
