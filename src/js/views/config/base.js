define([
  "models/user",
  "views/config/accounts",
  "views/config/events",
  "views/config/misc_configs",
  "views/config/projects",
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
  Accounts,
  ConfigTpl
) {

  return Backbone.View.extend({
    el: $(".content"),

    loadingTemplate: _.template("<div class=\"load-view\"><h1>Loading...</h1></div>"),

    events: {
      "click #logout" : function() {
        localStorage.clear();
        alert("You are successfully logged out!");
      }
    },

    configsTemplate: _.template(ConfigTpl),

    initialize: function () {
      this.listenTo(Backbone, "configs_updated", this.reloadBackground);
    },

    reloadBackground: function () {
      chrome.extension.getBackgroundPage().location.reload();
    },

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
