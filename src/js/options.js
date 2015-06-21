import { Fluxo, React, FluxoReactConnectStores } from "libs";
import RenderConfig from "render_config";
import ContactForm from "components/contact_form";
import ContactFormHandler from "action_handlers/contact_form";
import UserToken from "services/user_token";
import User from "services/user";
import Auth from "services/auth";

export default function() {
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

    currentUserFetch.then(RenderConfig, function(request) {
      if (request.status === 401) {
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

  var ContactFormConnected = FluxoReactConnectStores(ContactForm, { contactForm: contactFormStore });

  React.render(React.createElement(ContactFormConnected), document.getElementById("contact-ctn"));

  document.getElementById("extension_version").innerHTML = localStorage.getItem("currentVersion");
};
