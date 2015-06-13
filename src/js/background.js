define([
  "services/events_filter",
  "services/events_cache",
  "services/events_pooling",
  "services/configs_listened_accounts",
  "services/events_notifiers",
  "services/user_token",
  "services/migrator"
], function(
  EventsFilter,
  EventsCache,
  EventsPolling,
  ConfigListenedAccounts,
  EventsNotifiers,
  UserToken,
  Migrator
) {
  var LastUpdateAt = {
    key: function(accountID) {
      return (accountID + "-last-created-at");
    },

    set: function(accountID, at) {
      return localStorage.setItem(this.key(accountID), at);
    },

    get: function(accountID) {
      return localStorage.getItem(this.key(accountID));
    }
  };

  return function() {
    var poolingsIDs = [];


    var OnLoadItems = function(accountID, eventsData) {
      var filteredItems = EventsFilter(accountID, eventsData);

      EventsCache.addSome(accountID, filteredItems);

      if (LastUpdateAt.get(accountID)) {
        EventsNotifiers(accountID, filteredItems);
      }

      if (eventsData[0]) {
        LastUpdateAt.set(accountID, eventsData[0].created_at);
      }
    };

    var LoadingFail = function(xhr) {
      if (xhr.status === 401) {
        StopAllPollings();
        UserToken.refresh().then(StartAccountsEventsPooling);
      }
    };

    var Pooling = function(account) {
      var lastUpdate = LastUpdateAt.get(account.id);

      var poolingID =
        EventsPolling(
          account.id,
          lastUpdate,
          OnLoadItems.bind(null, account.id),
          LoadingFail
        );

      poolingsIDs.push(poolingID);
    };

    var StartAccountsEventsPooling = function() {
      _.each(ConfigListenedAccounts.getAccounts(), Pooling);
    };

    var StopAllPollings = function() {
      _.map(poolingsIDs, clearInterval);
      poolingsIDs = [];
    };

    // Migrator();

    StartAccountsEventsPooling();

    localStorage.setItem("currentVersion", chrome.runtime.getManifest().version);
  };
});
