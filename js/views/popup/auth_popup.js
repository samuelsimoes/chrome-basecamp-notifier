define([
  "app",
  "backbone"
], function(
  App
) {
  return Backbone.View.extend({
    template: _.template("<div class=\"login-button\"><input type=\"button\" value=\"Authenticate\" /></div>"),

    events: {
      "click input": "askAuthorization"
    },

    el: $("#content"),

    render: function() {
      this.$el.html(this.template({}));
    },

    askAuthorization: function() {
      chrome.tabs.create({url: App.askForAuthorizationUri });
    }
  });
});
