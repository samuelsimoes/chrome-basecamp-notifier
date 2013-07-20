define(["config_keys", "underscore"], function(ConfigKeys) {
  return _.extend(ConfigKeys, {
    askForAuthorizationUri: "https://launchpad.37signals.com/authorization/new?client_id="
                           + ConfigKeys.clientId +
                           "&redirect_uri="
                           + encodeURIComponent(ConfigKeys.redirectUri) +
                           "&type=web_server"
  });
});
