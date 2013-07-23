define(["underscore"], function() {
  module = {};

  module.listenedAccounts = function() {
    return JSON.parse(localStorage.getItem("listenedAccounts")) || {};
  };

  module.isListened = function(accountId) {
    return _.has(this.listenedAccounts(), accountId);
  };

  module.toggle = function(account) {
    var newObject;
    var obj = {};
    obj[account.id] = account;

    if (this.isListened(account.id)) {
      newObject = _.omit(this.listenedAccounts(), account.id.toString());
    } else {
      newObject = _.extend(this.listenedAccounts(), obj);
    }

    localStorage.setItem("listenedAccounts", JSON.stringify(newObject));
  };

  return module;
});
