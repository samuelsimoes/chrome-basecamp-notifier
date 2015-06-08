define([
  "services/authenticated_ajax",
  "services/account_user_id_loader"
], function(
  AuthenticatedAjax,
  AccountUserIdLoader
) {
  var USER_INFOS_URL = "https://launchpad.37signals.com/authorization.json";

  return {
    getCurrent: function() {
      if (!this.current) {
        this.current = JSON.parse(localStorage.getItem("currentUser"));
      }

      return this.current;
    },

    currentIdentityID: function() {
      return this.getCurrent().identity.id;
    },

    currentUserName: function() {
      return (this.getCurrent().identity.first_name + " " + this.getCurrent().identity.last_name);
    },

    userIDOnAccount: function(accountID) {
      return this.accountsUserIDs()[accountID];
    },

    accountsUserIDs: function() {
      if (!this.accountsUserIDsData) {
        this.accountsUserIDsData = (JSON.parse(localStorage.getItem("accountsUserIDs")) || {});
      }

      return this.accountsUserIDsData;
    },

    storeAccountUserID: function(accountID, userID) {
      var data = {};

      data[accountID] = userID;

      _.extend(this.accountsUserIDs(), data);

      localStorage.setItem("accountsUserIDs", JSON.stringify(this.accountsUserIDs()));
    },

    fetchIDOnAccount: function(accountID) {
      var loading = AccountUserIdLoader(accountID, this.currentIdentityID());

      loading.then(this.storeAccountUserID.bind(this, accountID));

      return loading;
    },

    fetch: function() {
      var promise = AuthenticatedAjax(USER_INFOS_URL);
      promise.then(this.cacheUser);
      return promise;
    },

    clear: function() {
      this.cacheUser();
    },

    cacheUser: function (userData) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
  };
});
