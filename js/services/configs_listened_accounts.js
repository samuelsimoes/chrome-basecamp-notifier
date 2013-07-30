define(["services/configs_base", "backbone"], function(ConfigsBase) {

  var base = new ConfigsBase("listenedAccounts", {});
  var module = {};

  module.listenedAccounts = function() {
    return base.get();
  };

  module.isListened = function(accountId) {
    return _.has(this.listenedAccounts(), accountId);
  };

  module.toggle = function(account) {
    var listenedAccounts = this.listenedAccounts();

    if (this.isListened(account.id)) {
      delete listenedAccounts[account.id];
    } else {
      listenedAccounts[account.id] = account;
    }

    base.save(listenedAccounts);
  };

  return module;
});
