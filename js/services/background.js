define([
  "collections/accounts",
  "services/account_stream",
  "services/configs_listened_accounts",
  "services/filter",
  "models/user_token",
  "services/migrator"
], function(
  Accounts,
  AccountStream,
  ConfigListenedAccounts,
  Filter,
  UserToken,
  Migrator
) {

  var streams = [];

  var dispatcher = $({});

  var stopAllStreams = function () {
    _.each(streams, function (stream) {
      stream.stop();
    });
  };

  var createAllStreams = function () {
    var listenedAccounts =
      new Accounts(ConfigListenedAccounts.listenedAccounts());

    _.each(listenedAccounts.models, function(account) {
      var stream = new AccountStream(account, UserToken, dispatcher, Filter);
      streams.push(stream);
    });
  };

  var startStreamEvents = function() {
    _.each(streams, function (stream) {
      stream.start();
    });
  };

  var handleStreamError = function () {
    dispatcher.on("stream-error", function (event, xhr) {
      if (xhr.status == 401) {
        stopAllStreams();

        UserToken.currentRefresh().done(function () {
          startStreamEvents();
        });
      }
    });
  };

  var presentNewFeature = function () {
    if(UserToken.current() != undefined && localStorage.getItem("currentVersion") != "1.4.0") {
      chrome.tabs.create({ url: chrome.extension.getURL('options.html?new_feature=true#tabs3-projects') });
    }
  };

  return function() {
    Migrator();

    handleStreamError();
    createAllStreams();
    startStreamEvents();
    presentNewFeature();

    localStorage.setItem("currentVersion", "1.4.0");
  };
});
