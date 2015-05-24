define([
  "services/array_local_storage",
  "services/events_cache",
  "services/events_pooling",
  "services/configs_listened_accounts",
  "services/events_notifiers",
  "services/migrator"
], function(
  ArrayLocalStorage,
  EventsCache,
  EventsPolling,
  ConfigListenedAccounts,
  EventsNotifiers,
  Migrator
) {
  var poolingsIDs = [];

  var startEventsPooling = function(account) {
    var lastCachedItem = (ArrayLocalStorage.lastItem(account.id) || {}),
        firstRun = true;

    var onLoadNewItems = function(eventsData) {
      EventsCache(account.id, eventsData);

      if (firstRun) {
        firstRun = false;
      } else {
        EventsNotifiers(eventsData);
      }
    };

    var poolingID = EventsPolling(account.id, lastCachedItem.created_at, onLoadNewItems);

    poolingsIDs.push(poolingID);
  };

  var startAccountsEventsPooling = function() {
    _.each(ConfigListenedAccounts.listenedAccounts(), startEventsPooling);
  };

  var stopAllPollings = function() {
    _.map(poolingsIDs, clearInterval);
    poolingsIDs = [];
  };

  // var handleStreamError = function () {
  //   dispatcher.on("stream-error", function (event, xhr) {
  //     if (xhr.status == 401) {
  //       stopAllStreams();
  //
  //       UserToken.currentRefresh().done(function () {
  //         startStreamEvents();
  //       });
  //     }
  //   });
  // };

  return function() {
    // Migrator();

    startAccountsEventsPooling();

    localStorage.setItem("currentVersion", chrome.runtime.getManifest().version);
  };
});
