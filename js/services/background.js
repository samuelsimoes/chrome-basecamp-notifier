define([
  "collections/events",
  "services/listened_accounts",
  "services/unread_events_cache",
  "services/notification",
  "services/badge"
], function(Events, ListenedAccounts, UnreadEventsCache, Notification, Badge) {

  var module = {};

  var fetchAccountEvents = function(account) {
    var events = new Events([], { account_id: account.id });

    events.on("add", function(model) {
      UnreadEventsCache.addItem(model.get("id"));
      Badge.update();
      Notification.notify(model, account);
    });

    events.stream();
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
