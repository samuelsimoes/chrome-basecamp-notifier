define([
  "collections/accounts",
  "collections/events",
  "services/filter",
  "services/configs_listened_accounts",
  "services/configs_misc",
  "services/unread_events_cache",
  "services/notification",
  "services/badge",
  "models/user_token",
  "services/migrator"
], function(
  Accounts,
  Events,
  Filter,
  ConfigListenedAccounts,
  ConfigsMisc,
  UnreadEventsCache,
  Notification,
  Badge,
  UserToken,
  Migrator
) {

  var module = {};

  var fetchAccountEvents = function(account) {
    var events = new Events([], {
      account: account,
      userToken: UserToken
    });
    var stream = events.stream();
    var filter = new Filter(events);
    module.firstTime = true;

    events.on("filteredAdd", function(model) {
      if (!module.firstTime) {
        UnreadEventsCache.addItem(model.get("id"));
        Badge.update();

        if(!ConfigsMisc.get("disable_desktop_notifications")) {
          Notification.notify(model);
        };
      }
    });

    // On successful cycle
    stream.progress(function(collection) {
      collection.updateCache();
      module.firstTime = false;
    });
  };

  module.streamEvents = function() {
    var listenedAccounts = ConfigListenedAccounts.listenedAccounts();
    listenedAccounts = new Accounts(_.values(listenedAccounts));

    _.each(listenedAccounts.models, function(model) {
      fetchAccountEvents(model);
    });
  };

  module.init = function() {
    module.streamEvents();
    Migrator();
  };

  return module;
});
