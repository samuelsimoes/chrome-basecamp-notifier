import { React, Fluxo, _, FluxoReactConnectStores } from "libs";
import Account from "components/popup/account";
import Badge from "services/badge";
import EventsPopupHandler from "action_handlers/events_popup";
import UserToken from "services/user_token";
import ConfigsListenedAccounts from "services/configs_listened_accounts";
import App from "app.js";

export default function() {
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
      EventsPopupHandler,
      eventsStore,
      starredEventsStore,
      account
    );

    var ConnectedAccount = FluxoReactConnectStores(Account, {
      starredEvents: starredEventsStore,
      events: eventsStore
    });

    var accountEventsComponent =
      React.createElement(ConnectedAccount, { name: account.name, id: account.id });

    React.render(accountEventsComponent, CreateEventListContainer());
  };

  Badge.update(0);

  if (!UserToken.current()) {
    return chrome.tabs.create({ url: App.askForAuthorizationUri });
  }

  var listenedAccounts = ConfigsListenedAccounts.getAccounts();

  if (listenedAccounts && listenedAccounts.length) {
    var blankSlateAccounts = document.getElementById("blank_slate_accounts");
    blankSlateAccounts.parentNode.removeChild(blankSlateAccounts);
  }

  _.each(listenedAccounts, ShowAccountEvents);

  document.getElementById("configs_button").addEventListener("click", function() {
    chrome.tabs.create({ url: chrome.extension.getURL("options.html") });
  });
};
