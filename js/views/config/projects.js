define([
  "services/configs_listened_accounts",
  "views/config/projects_list",
  "collections/accounts",
  "backbone"
], function(
  ConfigListenedAccounts,
  ProjectsListView,
  Accounts
) {

  return Backbone.View.extend({
    accountsProjects: [],

    initialize: function () {
      this.collection =
        new Accounts(ConfigListenedAccounts.listenedAccounts());

      this.collectAllAccountsProjectsCollections();
    },

    collectAllAccountsProjectsCollections: function () {
      _.each(this.collection.models, function (account) {
        this.accountsProjects.push(account.getProjects());
      }, this);
    },

    fetchAllAccountProjectsCollections: function () {
      return _.reduce(this.accountsProjects, function (result, accountProject) {
        result.push(accountProject.fetchAuthorized());
        return result;
      }, []);
    },

    render: function () {
      var that = this;
      var allPromises = this.fetchAllAccountProjectsCollections();
      var promise = $.Deferred();

      $.when.apply(null, allPromises).done(function () {
        that.renderProjectsCollection();
        promise.resolve(that);
      });

      return promise;
    },

    renderProjectsCollection: function () {
      _.each(this.collection.models, function (account) {
        var projectListView =
          new ProjectsListView({
            collection: account.getProjects(),
            account: account
          });

        this.$el.append(projectListView.render().el);
      }, this);
    }
  });
});
