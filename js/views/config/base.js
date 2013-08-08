define([
  "models/user",
  "views/config/accounts",
  "views/config/events",
  "views/config/misc_configs",
  "collections/accounts",
  "text!templates/configs.html",
  "backbone",
  "easytab"
], function(
  User,
  AccountsView,
  EventsView,
  MiscConfigsView,
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

      this.renderAccountsTab(user.get("accounts"));
      this.renderEventsTab();
      this.renderProjectsTab();
      this.renderMiscConfigsTab();
    },

    renderLoadingPage: function() {
      this.$el.html(this.loadingTemplate({}));
    },

    close: function() {
      chrome.extension.getBackgroundPage().location.reload();
      window.open('', '_self', '');
      window.close();
    },

    renderEventsTab: function() {
      var eventsView = new EventsView().render();
      this.$el.find("#tabs2-events").html(eventsView.el);
    },

    renderAccountsTab: function(accounts) {
      var accounts = new Accounts(accounts);
      var accountsView = new AccountsView({ collection: accounts }).render();
      this.$el.find("#tabs1-accounts").html(accountsView.el);
    },

    renderMiscConfigsTab: function() {
      var miscConfigsView = new MiscConfigsView().render();
      this.$el.find("#tabs4-misc").html(miscConfigsView.el)
    },

    renderProjectsTab: function() {
    }
  });
});
