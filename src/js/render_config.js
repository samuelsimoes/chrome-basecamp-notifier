define([
  "jsx!components/options/base",
  "action_handlers/config_listened_accounts",
  "action_handlers/config_ignored_events_types",
  "action_handlers/config_ignored_projects",
  "action_handlers/config_misc",
  "react",
  "fluxo"
], function(
  OptionsBase,
  ConfigListenedAccountsActionHandler,
  ConfigIgnoredEventsTypesActionHandler,
  ConfigIgnoredProjectsActionHandler,
  ConfigMiscActionHandler,
  React,
  Fluxo
) {
  return function() {
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
});
