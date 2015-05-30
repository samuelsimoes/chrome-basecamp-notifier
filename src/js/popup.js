define([
  "react",
  "fluxo",
  "jsx!components/popup/account",
  "services/configs_listened_accounts",
  "services/badge",
  "action_handlers/events_popup",
  "models/user_token",
  "app"
], function(
  React,
  Fluxo,
  Account,
  ConfigListenedAccounts,
  Badge,
  EventsPopupActionHandler,
  UserToken,
  App
) {
  var CreateEventListContainer = function() {
    var container = document.createElement("div");

    document.body.appendChild(container);

    return container;
  };

  var ShowAccountEvents = function(account) {
    var actionHandlerIdentifier = ("Events" + account.id),
        eventsStore = new Fluxo.CollectionStore(),
        starredEventsStore = new Fluxo.CollectionStore();

    Fluxo.registerActionHandler(
      actionHandlerIdentifier,
      EventsPopupActionHandler,
      eventsStore,
      starredEventsStore,
      account
    );

    var accountEventsComponent =
      React.createElement(
        Account,
        {
          name: account.name,
          id: account.id,
          starredEvents: starredEventsStore,
          events: eventsStore
        }
      );

    React.render(accountEventsComponent, CreateEventListContainer());
  };

  Badge.update(0);

  if (!UserToken.current()) {
    return chrome.tabs.create({ url: App.askForAuthorizationUri });
  }

  var listenedAccounts = ConfigListenedAccounts.listenedAccounts();

  _.each(listenedAccounts, ShowAccountEvents);

  document.getElementById("configs_button").addEventListener("click", function() {
    chrome.tabs.create({ url: chrome.extension.getURL("options.html") });
  });
});
