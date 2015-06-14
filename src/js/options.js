define([
  "fluxo",
  "render_config",
  "jsx!components/contact_form",
  "action_handlers/contact_form",
  "services/user_token",
  "services/user",
  "services/auth",
  "react"
], function(
  Fluxo,
  RenderConfig,
  ContactForm,
  ContactFormHandler,
  UserToken,
  User,
  Auth,
  React
) {
  return function() {
    var AuthCode = function() {
      var authCode = location.search.match(/\?code\=([^\&]+)/);
      return authCode ? authCode[1] : false;
    };

    var ResolveAuthReturn = function(authCode) {
      var auth = Auth.authorize(authCode);

      auth.then(function() {
        // reload without the auth code
        window.location = (window.location.origin + window.location.pathname);
      }, function() {
        alert("Error on load user, please try again.");
      });
    };

    var authCode = AuthCode(),
        currentToken = UserToken.current();

    /**
     * There are three possibilities at this point...
     *
     * 1. There's a auth code on the URL. Get the user token.
     * 2. There's no auth token. Redirect to Basecamp to get permission.
     * 3. There's a valid token. Render the config screen.
     */

    if (authCode) {
      ResolveAuthReturn(authCode);
    } else if (!currentToken) {
      Auth.getPermission();
    } else {
      var currentUserFetch = User.fetch();

      currentUserFetch.then(RenderConfig, function(xhr) {
        if (xhr.status === 401) {
          alert("Could not load your user information, please authorize the app again.");
          UserToken.clearCurrentCredentials();
          Auth.getPermission();
        } else {
          alert("Could not load your user information, please try again.");
        }
      });
    }

    document.getElementById("logout").addEventListener("click", function() {
      UserToken.clearCurrentCredentials();
      chrome.extension.getViews({ type: "tab" })[0].close();
    });

    var contactFormStore = new Fluxo.Store();

    Fluxo.registerActionHandler("ContactForm", ContactFormHandler, contactFormStore);

    React.render(
      React.createElement(ContactForm, { contactForm: contactFormStore }),
      document.getElementById("contact-ctn")
    );

    document.getElementById("extension_version").innerHTML = localStorage.getItem("currentVersion");
  };
});
