define([
  "react",
  "fluxo",
  "jsx!components/popup/account",
  "services/configs_listened_accounts",
  "services/badge",
  "action_handlers/popup_events"
], function(
  React,
  Fluxo,
  Account,
  ConfigListenedAccounts,
  Badge,
  EventsActionHandler
) {
  var createContainer = function(accountID) {
    var container = document.createElement("div"),
        containerId = ("account_" + accountID);

    container.id = containerId;

    document.body.appendChild(container);

    return container;
  };

  var showAccountEvents = function(account) {
    var actionHandlerIdentifier = ("Events" + account.id),
        eventsStore = new Fluxo.CollectionStore(),
        starredEventsStore = new Fluxo.CollectionStore();

    Fluxo.registerActionHandler(
      actionHandlerIdentifier,
      EventsActionHandler,
      eventsStore,
      starredEventsStore,
      account
    );

    React.render(
      React.createElement(
        Account, {
        name: account.name,
        id: account.id,
        starredEvents: starredEventsStore,
        events: eventsStore
      }),
      createContainer(account.id)
    );
  };

  Badge.update(0);

  var listenedAccounts = ConfigListenedAccounts.listenedAccounts();

  _.each(listenedAccounts, showAccountEvents);

  document.getElementById("configs_button").addEventListener("click", function() {
    chrome.tabs.create({ url: chrome.extension.getURL("options.html") });
  });
});
