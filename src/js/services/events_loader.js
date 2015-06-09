define([
  "services/events_endpoint",
  "services/authenticated_ajax"
], function(
  EventsEndpoint,
  AuthenticatedAjax
) {
  return function(accountID, options) {
    var url = EventsEndpoint(accountID);
    return AuthenticatedAjax(url, options);
  };
});
