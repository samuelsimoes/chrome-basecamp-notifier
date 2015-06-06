define([
  "fluxo",
  "services/configs_listened_accounts",
  "services/projects_loader",
  "services/configs_ignored_projects",
  "underscore"
], function(
  Fluxo,
  ConfigsListenedAccounts,
  ProjectsLoader,
  ConfigIgnoredProjects,
  _
) {
  return {
    initialize: function (ignoredProjectsStore) {
      this.ignoredProjectsStore = ignoredProjectsStore;

      this._load();

      Fluxo.Radio.subscribe("listenedProjectsChanged", this._load.bind(this));
    },

    _load: function () {
      this.ignoredProjectsStore.removeAll();

      var accountsData = ConfigsListenedAccounts.getAccounts();

      _.each(accountsData, function(accountData) {
        ProjectsLoader(accountData.id).done(this._loadProject.bind(this, accountData));
      }, this);
    },

    _loadProject: function (accountData, projectsData) {
      _.each(projectsData, function(projectData) {
        projectData.account_name = accountData.name;
        projectData.ignored = ConfigIgnoredProjects.isIgnored(projectData.id);
      });

      this.ignoredProjectsStore.addBunchFromData(projectsData);
    },

    toggle: function(projectID) {
      var store = this.ignoredProjectsStore.find(projectID),
          ignored = store.data.ignored;

      var cacheAction = ignored ? "remove" : "add";

      ConfigIgnoredProjects[cacheAction](projectID);

      store.setAttribute("ignored", !ignored);
    }
  };
});
