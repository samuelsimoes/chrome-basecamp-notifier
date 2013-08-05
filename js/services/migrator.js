define([], function() {

  return function() {
    var legacyConfig = localStorage.getItem("configs");

    if (!legacyConfig) {
      return;
    };

    legacyConfig = JSON.parse(legacyConfig);

    if (legacyConfig.ignoredEvents) {
      localStorage
        .setItem("ignoredEvents", JSON.stringify(legacyConfig.ignoredEvents));
    };

    if (legacyConfig.listenedAccounts) {
      localStorage
        .setItem("listenedAccounts", JSON.stringify(legacyConfig.listenedAccounts));
    };

    localStorage
      .removeItem("configs");
  };

});
