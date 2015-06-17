import { _ } from "libs";
import EventsFilter from "services/events_filter";
import EventsCache from "services/events_cache";
import EventsPolling from "services/events_polling";
import ConfigsListenedAccounts from "services/configs_listened_accounts";
import EventsNotifiers from "services/events_notifiers";
import UserToken from "services/user_token";
import EventsLastUpdateAt from "services/events_last_update_at";
import Migrator from "services/migrator";

export default function() {
  var poolingsIDs = [];

  var OnLoadItems = function(accountID, eventsData) {
    var filteredItems = EventsFilter(accountID, eventsData);

    EventsCache.addSome(accountID, filteredItems);

    if (EventsLastUpdateAt.get(accountID)) {
      EventsNotifiers(accountID, filteredItems);
    }

    if (eventsData[0]) {
      EventsLastUpdateAt.set(accountID, eventsData[0].created_at);
    }
  };

  var LoadingFail = function(request) {
    if (request.status === 401) {
      StopAllPollings();
      UserToken.refresh().then(StartAccountsEventsPooling);
    }
  };

  var Pooling = function(account) {
    var lastUpdate = EventsLastUpdateAt.get(account.id);

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
    _.each(ConfigsListenedAccounts.getAccounts(), Pooling);
  };

  var StopAllPollings = function() {
    _.map(poolingsIDs, clearInterval);
    poolingsIDs = [];
  };

  Migrator();

  StartAccountsEventsPooling();

  localStorage.setItem("currentVersion", chrome.runtime.getManifest().version);
};
