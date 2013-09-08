define([], function() {

  return function() {
    var legacyAccountsConfig = JSON.parse(localStorage.getItem("listenedAccounts"));

    if (_.isArray(legacyAccountsConfig)) {
      return;
    } else {
      localStorage.setItem("listenedAccounts", JSON.stringify(_.values(legacyAccountsConfig)));
    };
  };
});
