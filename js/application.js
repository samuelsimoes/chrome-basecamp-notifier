_.extend(BasecampNotifier, {
  authorizationUri: "https://launchpad.37signals.com/authorization/new?client_id="
                     + BasecampNotifier.ConfigKeys.client_id +
                     "&redirect_uri="
                     + encodeURIComponent(BasecampNotifier.ConfigKeys.redirect_uri) +
                     "&type=web_server"
});
