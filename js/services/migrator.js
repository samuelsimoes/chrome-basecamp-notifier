define([], function() {

  return function() {
    var legacyConfig = localStorage.getItem("configs");

    if (!legacyConfig) {
      return;
    };

    legacyConfig = JSON.parse(legacyConfig);

    localStorage
      .setItem("ignoredEvents", JSON.stringify(legacyConfig.ignoredEvents));
    localStorage
      .setItem("listenedAccounts", JSON.stringify(legacyConfig.listenedAccounts));
    localStorage
      .removeItem("configs");
  };

});
