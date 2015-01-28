define(["config_keys", "underscore"], function(ConfigKeys) {
  return _.extend(ConfigKeys, {
    askForAuthorizationUri: "https://launchpad.37signals.com/authorization/new?client_id="
                           + ConfigKeys.clientId +
                           "&redirect_uri="
                           + chrome.extension.getURL("options.html") +
                           "&type=web_server",
    redirectUri: chrome.extension.getURL("options.html")
  });
});
