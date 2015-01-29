define(["services/configs_base", "backbone"], function(ConfigsBase) {

  var base = new ConfigsBase("listenedAccounts", []);
  var module = {};

  module.listenedAccounts = function() {
    return base.get();
  };

  module.isListened = function(account) {
    return _.any(this.listenedAccounts(), function(listenedAccount) {
      return listenedAccount.id == account.getId();
    });
  };

  module.toggle = function(account) {
    var listenedAccounts = this.listenedAccounts();

    if (this.isListened(account)) {
      listenedAccounts = _.filter(listenedAccounts, function (listenedAccount) {
        return listenedAccount.id != account.getId();
      });
    } else {
      listenedAccounts.push(account.toJSON());
    }

    base.save(listenedAccounts);
  };

  return module;
});
