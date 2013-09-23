define([
  "models/user",
  "views/config/accounts",
  "views/config/events",
  "views/config/misc_configs",
  "views/config/projects",
  "services/events_cache",
  "collections/accounts",
  "text!templates/configs.html",
  "backbone",
  "easytab"
], function(
  User,
  AccountsView,
  EventsView,
  MiscConfigsView,
  ProjectsView,
  EventsCache,
  Accounts,
  ConfigTpl
) {

  return Backbone.View.extend({
    el: $(".content"),

    loadingTemplate: _.template("<div class=\"load-view\"><h1>Loading...</h1></div>"),

    events: {
      "click #save" : "close",
      "click #logout" : function() {
        localStorage.clear();
        this.close();
      }
    },

    configsTemplate: _.template(ConfigTpl),

    render: function(user) {
      this.$el.html(this.configsTemplate({}));
      this.$el.find(".tab-container").easytabs();

      this.accounts = user.getAccounts();

      this.renderAccountsTab();
      this.renderEventsTab();
      this.renderProjectsTab();
      this.renderMiscConfigsTab();
      this.printVersion();
    },

    printVersion: function () {
      $("#extension_version").html("v" + chrome.runtime.getManifest().version);
    },

    renderLoadingPage: function() {
      this.$el.html(this.loadingTemplate({}));
    },

    close: function() {
      EventsCache.clearAllCache();
      chrome.extension.getBackgroundPage().location.reload();
      window.open('', '_self', '');
      window.close();
    },

    renderEventsTab: function() {
      var eventsView = new EventsView().render();
      this.$el.find("#tabs2-events").html(eventsView.el);
    },

    renderAccountsTab: function(accounts) {
      var accountsView = new AccountsView({ collection: this.accounts }).render();
      this.$el.find("#tabs1-accounts").html(accountsView.el);
    },

    renderMiscConfigsTab: function() {
      var miscConfigsView = new MiscConfigsView().render();
      this.$el.find("#tabs4-misc").html(miscConfigsView.el)
    },

    renderProjectsTab: function() {
      var projectsViewPromise = new ProjectsView().render();
      var tab = this.$el.find("#tabs3-projects")

      tab.html("Loading projects, please wait...")

      projectsViewPromise.done(function (view) {
        tab.html(view.el);
      });
    }
  });
});
