define([
  "services/configs_listened_accounts",
  "underscore"
], function(
  ConfigListenedAccounts
) {

  return {
    update: function (key, collection) {
      var actualCache = this.get(key);
      var newCache = _.first(_.union(collection, actualCache), 15);
      localStorage.setItem(key, JSON.stringify(newCache));
    },

    get: function (key) {
      var cache = localStorage.getItem(key);

      if (cache == undefined) {
        return [];
      }

      return JSON.parse(cache);
    },

    clearAllCache: function () {
      _.each(ConfigListenedAccounts.listenedAccounts(), function (account) {
        localStorage.removeItem(account.href + "/events.json");
      });
    }
  };

});
