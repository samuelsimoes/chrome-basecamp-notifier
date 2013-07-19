BasecampNotifier.ConfigView = Backbone.View.extend({
  el: $("#main-content"),

  loadingTemplate: function() { return new EJS({ url: "/js/templates/configs/loading.ejs" }); },

  render: function() {
    this.resolveAction();
  },

  renderLoadingPage: function() {
    this.$el.html(this.loadingTemplate().render({}));
  },

  resolveAction: function() {
    if (this.returningFromPermissionScreen()) {
      this.fetchUser();
    } else if (!BasecampNotifier.User.loggedIn()) {
      BasecampNotifier.User.authenticate();
    } else {
      console.log("Usuário já logado");
    }
  },

  fetchUser: function() {
    var tokenPromisse = BasecampNotifier.User.fetchNewToken(this.authCode);

    this.renderLoadingPage();

    tokenPromisse.done(function(){
      setTimeout(function() {
        var userPromisse = BasecampNotifier.User.fetchUser();

        userPromisse.done(function() {
          setTimeout(function() {
            console.log("Usuário Carregado com sucesso!");
          }, 0);
        });
      }, 0);
    });
  },

  returningFromPermissionScreen: function() {
    var authCode = location.search.match(/\?code\=([^\&]+)/);

    if (authCode != undefined) {
      this.authCode = authCode[1];
      return true;
    } else {
      return false;
    }
  }
});
