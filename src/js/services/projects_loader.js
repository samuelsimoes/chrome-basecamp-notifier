import AuthenticatedAjax from "services/authenticated_ajax";

export default function(accountID, options) {
  var url = "https://basecamp.com/" + accountID + "/api/v1/projects.json";
  return AuthenticatedAjax(url, options);
};
