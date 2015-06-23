import EventsLastUpdateAt from "services/events_last_update_at";
import Badge from "services/badge";
import User from "services/user";
import EventsEndpoint from "services/events_endpoint";
import ArrayLocalStorage from "services/array_local_storage";

export default function() {
  var localVersion = (localStorage.getItem("currentVersion") || chrome.runtime.getManifest().version);

  if (localVersion.slice(0,1) === "2") { return; }

  var currentUser = User.getCurrent();

  if (currentUser) {
    var accounts = currentUser.accounts;

    accounts.forEach(function(accountData) {
      var previousCache = localStorage.getItem(EventsEndpoint(accountData.id));

      if (!previousCache) { return; }

      localStorage.setItem(accountData.id, previousCache);

      previousCache = JSON.parse(previousCache);

      if (previousCache[0]) {
        EventsLastUpdateAt.set(accountData.id, previousCache[0].created_at)
      }
    });
  }

  var previousListenedAccountsCache = ArrayLocalStorage.getAll("listenedAccounts");

  var listenedAccountsIDs = previousListenedAccountsCache.map(function(accountData) {
    return accountData.id;
  });

  ArrayLocalStorage.update("listenedAccounts", listenedAccountsIDs);

  previousListenedAccountsCache.forEach(function(accountData) {
    User.fetchIDOnAccount(accountData.id);

    var previousStarredEvents =
      ArrayLocalStorage.getAll(("starred-items-" + accountData.id));

    previousStarredEvents.forEach(function(eventData) {
      eventData.starred = true;
    });

    ArrayLocalStorage.update(("starred-items-" + accountData.id), previousStarredEvents);
  });

  var unreadEvents = ArrayLocalStorage.getAll("unreadEvents");

  Badge.update(unreadEvents.length);
};
