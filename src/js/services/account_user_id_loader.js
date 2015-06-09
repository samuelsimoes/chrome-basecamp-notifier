define([
  "services/authenticated_ajax",
  "services/user",
  "services/defer"
], function(
  AuthenticatedAjax,
  User,
  Defer
) {
  return function(accountID, identityID) {
    var defer = Defer();

    var peopleLoading = AuthenticatedAjax("https://basecamp.com/" + accountID + "/api/v1/people.json");

    var GrabTheUserID = function(peopleData) {
      var currentUser = _.findWhere(peopleData, { identity_id: identityID });

      if (!currentUser) {
        throw new Error("Current user isn't found on the people of listened account.");
      }

      defer.resolve(currentUser.id);
    };

    peopleLoading.then(GrabTheUserID, defer.reject);

    return defer.promise;
  };
});
