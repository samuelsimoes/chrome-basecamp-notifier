define([
  "services/configs_listened_accounts",
  "underscore"
], function(
  ConfigListenedAccounts
) {

  return {
    update: function (key, collection, override) {
      var actualCache = this.get(key);

      if (override == undefined && override == true) {
        var newCache = _.first(_.union(collection, actualCache), 15);
      } else {
        var newCache = collection;
      }

      var backgroundPage = chrome.extension.getBackgroundPage();

      if(!_.isObject(backgroundPage.eventsCache)) {
        backgroundPage.eventsCache = {};
      }

      backgroundPage.eventsCache[key] = newCache;

      localStorage.setItem(key, JSON.stringify(newCache));
    },

    get: function (key) {
      var backgroundPage = chrome.extension.getBackgroundPage();

      if(!_.isObject(backgroundPage.eventsCache)) {
        backgroundPage.eventsCache = {};
      }

      if (backgroundPage.eventsCache[key] == undefined) {
        var storedCache = localStorage.getItem(key);

        if (storedCache == undefined) {
          backgroundPage.eventsCache[key] = [];
        } else {
          backgroundPage.eventsCache[key] = JSON.parse(storedCache);
        }
      }

      return backgroundPage.eventsCache[key];
    },

    clearAllCache: function () {
      var backgroundPage = chrome.extension.getBackgroundPage();

      if(!_.isObject(backgroundPage.eventsCache)) {
        backgroundPage.eventsCache = {};
      }

      _.each(ConfigListenedAccounts.listenedAccounts(), function (account) {
        localStorage.removeItem(account.href + "/events.json");
        backgroundPage.eventsCache[(account.href + "/events.json")] = [];
      });
    }
  };
});
