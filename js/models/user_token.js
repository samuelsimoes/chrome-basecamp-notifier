BasecampNotifier.UserToken = Backbone.Model.extend({
  initialize: function(){
    this.url = "https://launchpad.37signals.com/authorization/token?client_id="
               + BasecampNotifier.ConfigKeys.client_id +
               "&redirect_uri="
               + encodeURIComponent(BasecampNotifier.ConfigKeys.redirect_uri) +
               "&client_secret="
               + BasecampNotifier.ConfigKeys.client_secret +
               "&type=web_server&code=" + this.get("auth_code");
  }
}, {
  modelType: "UserToken"
});
