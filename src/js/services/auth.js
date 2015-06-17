import App from "app";
import UserToken from "services/user_token";
import User from "services/user";

export default {
  getPermission: function() {
    window.location = App.askForAuthorizationUri;
  },

  authorize: function(authCode) {
    return UserToken.fetch(authCode);
  }
};
