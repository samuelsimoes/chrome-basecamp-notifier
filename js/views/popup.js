BasecampNotifier.PopupView = Backbone.View.extend({
  render: function() {
    if (!BasecampNotifier.User.loggedIn()) {
      BasecampNotifier.User.authenticate();
    }
  }
});
