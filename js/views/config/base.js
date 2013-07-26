define([
  "models/user",
  "views/config/accounts",
  "views/config/events",
  "collections/accounts",
  "text!templates/configs.html",
  "backbone",
  "easytab"
], function(
  User,
  AccountsView,
  EventsView,
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
      var that = this;

      this.$el.html(this.configsTemplate({}));
      this.$el.find(".tab-container").easytabs();

      that.renderAccountsTab(user.get("accounts"));
      that.renderEventsTab();
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
      new EventsView().render();
    },

    renderAccountsTab: function(accounts) {
      var accounts = new Accounts(accounts);
      new AccountsView({ collection: accounts }).render();
    }
  });
});
