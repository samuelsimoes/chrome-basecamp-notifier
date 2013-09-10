define([
  "underscore"
], function(
  User
) {

  return {
    storage: function () {
      if (chrome.extension.getBackgroundPage()["httpCache"] == undefined) {
        chrome.extension.getBackgroundPage()["httpCache"] = {};
      }

      return chrome.extension.getBackgroundPage()["httpCache"];
    },

    storeLastModifiedHeader: function (key, value) {
      this.storage()[key] = value;
    },

    getLastModifiedHeader: function (key) {
      return this.storage()[key];
    }
  };
});
