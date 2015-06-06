define([
  "services/authenticated_ajax"
], function(
  AuthenticatedAjax
) {
  return function(accountID, options) {
    var url = "https://basecamp.com/" + accountID + "/api/v1/projects.json";
    return AuthenticatedAjax(url, options);
  };
});
