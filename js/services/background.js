define([
  "collections/events",
  "services/listened_accounts",
  "services/unread_events_cache"
], function(Events, ListenedAccounts, UnreadEventsCache) {

  var module = {}

  var fetchAccountEvents = function(account) {
    var events = new Events([], { account_id: account.id });

    events.on("add", function(model) {
      UnreadEventsCache.addItem(model.get("id"));
      console.log("Notify!");
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
