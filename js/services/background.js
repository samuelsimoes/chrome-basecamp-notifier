define([
  "collections/events",
  "services/listened_accounts",
  "services/unread_events_cache",
  "services/notification",
  "services/badge",
  "models/user_token"
], function(Events, ListenedAccounts, UnreadEventsCache, Notification, Badge, UserToken) {

  var module = {};

  var fetchAccountEvents = function(account) {
    var events = new Events([], { account_id: account.id });
    var stream = events.stream();

    // On new item in collection
    events.on("add", function(model) {
      UnreadEventsCache.addItem(model.get("id"));
      Badge.update();
      Notification.notify(model, account);
    });

    // On successful cycle
    stream.progress(function(collection) {
      collection.updateCache();
    });
  };

  module.streamEvents = function() {
    var listenedAccounts = ListenedAccounts.listenedAccounts();

    for(var account in listenedAccounts) {
      fetchAccountEvents(listenedAccounts[account]);
    }
  };

  module.init = function() {
    module.streamEvents();
  };

  return module;
});
