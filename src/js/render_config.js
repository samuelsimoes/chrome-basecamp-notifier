import { React, Fluxo } from "libs";
import OptionsBase from "components/options/base";
import ConfigListenedAccountsActionHandler from "action_handlers/config_listened_accounts";
import ConfigIgnoredEventsTypesActionHandler from "action_handlers/config_ignored_events_types";
import ConfigIgnoredProjectsActionHandler from "action_handlers/config_ignored_projects";
import ConfigMiscActionHandler from "action_handlers/config_misc";

export default function() {
  var listenedAccountsStore = new Fluxo.CollectionStore(),
      ignoredEventsTypesStore = new Fluxo.CollectionStore(),
      ignoredProjectsStore = new Fluxo.CollectionStore(),
      miscStore = new Fluxo.Store();

  Fluxo.registerActionHandler(
    "ConfigsListenedAccounts",
    ConfigListenedAccountsActionHandler,
    listenedAccountsStore
  );

  Fluxo.registerActionHandler(
    "ConfigsIgnoredEventsTypes",
    ConfigIgnoredEventsTypesActionHandler,
    ignoredEventsTypesStore
  );

  Fluxo.registerActionHandler(
    "ConfigsIgnoredProjects",
    ConfigIgnoredProjectsActionHandler,
    ignoredProjectsStore
  );

  Fluxo.registerActionHandler(
    "ConfigsMisc",
    ConfigMiscActionHandler,
    miscStore
  );

  React.render(
    React.createElement(OptionsBase, {
      listenedAccounts: listenedAccountsStore,
      ignoredEventTypes: ignoredEventsTypesStore,
      ignoredProjects: ignoredProjectsStore,
      misc: miscStore
    }),
    document.getElementById("content-ctn")
  );
};
