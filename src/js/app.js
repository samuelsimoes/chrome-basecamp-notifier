define(["underscore"], function() {
  var basecampCredentials = {
    clientId: "@@basecampClientId",
    clientSecret: "@@basecampSecret"
  };

  return _.extend({}, basecampCredentials, {
    askForAuthorizationUri: "https://launchpad.37signals.com/authorization/new?client_id="
                           + basecampCredentials.clientId +
                           "&redirect_uri="
                           + chrome.extension.getURL("options.html") +
                           "&type=web_server",
    redirectUri: chrome.extension.getURL("options.html")
  });
});
