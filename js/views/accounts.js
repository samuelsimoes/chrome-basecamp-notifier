BasecampNotifier.AccountsView = Backbone.View.extend({
  el: $(".accounts"),

  template: function() { return new EJS({ url: "/js/templates/accounts/project.ejs" }); },

  render: function() {
  }
});
