define([
  "services/array_local_storage",
  "services/events_cache",
  "services/events_pooling",
  "services/configs_listened_accounts",
  "services/events_notifiers",
  "services/user_token",
  "fluxo",
  "services/migrator"
], function(
  ArrayLocalStorage,
  EventsCache,
  EventsPolling,
  ConfigListenedAccounts,
  EventsNotifiers,
  UserToken,
  Fluxo,
  Migrator
) {
  return function() {
    var poolingsIDs = [];

    var startEventsPooling = function(account) {
      var lastCachedItem = (ArrayLocalStorage.lastItem(account.id) || {}),
          firstRun = true;

      var onLoadNewItems = function(eventsData) {
        EventsCache(account.id, eventsData);

        if (firstRun) {
          firstRun = false;
        } else {
          EventsNotifiers(eventsData, account.id);
        }
      };

      var poolingID = EventsPolling(account.id, lastCachedItem.created_at, onLoadNewItems);

      poolingsIDs.push(poolingID);
    };

    var startAccountsEventsPooling = function() {
      _.each(ConfigListenedAccounts.getAccounts(), startEventsPooling);
    };

    var stopAllPollings = function() {
      _.map(poolingsIDs, clearInterval);
      poolingsIDs = [];
    };

    // Migrator();

    Fluxo.Radio.subscribe("eventsLoadingFail", function() {
      stopAllPollings();

      UserToken.refresh().then(startAccountsEventsPooling);
    });

    startAccountsEventsPooling();

    localStorage.setItem("currentVersion", chrome.runtime.getManifest().version);
  };
});
