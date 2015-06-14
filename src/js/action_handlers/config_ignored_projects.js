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

      accountsData.forEach(function(accountData) {
        ProjectsLoader(accountData.id).then(this._loadProject.bind(this, accountData));
      }.bind(this));
    },

    _loadProject: function (accountData, request) {
      var projectsData = request.response;

      projectsData.forEach(function(projectData) {
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
