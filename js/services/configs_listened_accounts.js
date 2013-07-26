define(["services/configs_base", "backbone"], function(ConfigsBase) {

  ConfigsBase.listenedAccounts = function() {
    return this.get("listenedAccounts") || {};
  };

  ConfigsBase.isListened = function(accountId) {
    return _.has(this.listenedAccounts(), accountId);
  };

  ConfigsBase.toggle = function(account) {
    var listenedAccounts = this.listenedAccounts();

    if (this.isListened(account.id)) {
      delete listenedAccounts[account.id];
    } else {
      listenedAccounts[account.id] = account;
    }

    this.set("listenedAccounts", listenedAccounts);
  };

  return ConfigsBase;
});
