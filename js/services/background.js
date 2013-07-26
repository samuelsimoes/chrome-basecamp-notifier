define([
  "collections/events",
  "services/configs_listened_accounts",
  "services/unread_events_cache",
  "services/notification",
  "services/badge",
  "models/user_token"
], function(Events, ConfigListenedAccounts, UnreadEventsCache, Notification, Badge, UserToken) {

  var module = {};

  var fetchAccountEvents = function(account) {
    var events = new Events([], { account_id: account.id });
    var stream = events.stream();
    var firstTime = true;

    var notify = function(model) {
      if (firstTime) return;
      UnreadEventsCache.addItem(model.get("id"));
      Badge.update();
      Notification.notify(model, account);
    };

    events.on("permitedItemAdd", function(model) {
      notify(model);
    });

    // On successful cycle
    stream.progress(function(collection) {
      collection.updateCache();
      firstTime = false;
    });
  };

  module.streamEvents = function() {
    var listenedAccounts = ConfigListenedAccounts.listenedAccounts();

    for(var account in listenedAccounts) {
      fetchAccountEvents(listenedAccounts[account]);
    }
  };

  module.init = function() {
    module.streamEvents();
  };

  return module;
});
