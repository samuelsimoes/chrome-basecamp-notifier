export default {
  key: function(accountID) {
    return ("last-created-at-" + accountID);
  },

  set: function(accountID, at) {
    return localStorage.setItem(this.key(accountID), at);
  },

  get: function(accountID) {
    return localStorage.getItem(this.key(accountID));
  }
};
