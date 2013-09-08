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

  return function() {
    handleStreamError();
    createAllStreams();
    startStreamEvents();

    Migrator();
  };
});
