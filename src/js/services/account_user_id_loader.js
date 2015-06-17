import { _ } from "libs";
import AuthenticatedAjax from "services/authenticated_ajax";
import Defer from "services/defer";

export default function(accountID, identityID) {
  var defer = Defer();

  var peopleLoading = AuthenticatedAjax("https://basecamp.com/" + accountID + "/api/v1/people.json");

  var GrabTheUserID = function(request) {
    var currentUser = _.findWhere(request.response, { identity_id: identityID });

    if (!currentUser) {
      throw new Error("Current user isn't found on the people of listened account.");
    }

    defer.resolve(currentUser.id);
  };

  peopleLoading.then(GrabTheUserID, defer.reject);

  return defer.promise;
};
