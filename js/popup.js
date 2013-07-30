require(["common"], function (common) {
  require([
    "views/popup/popup",
    "views/popup/auth_popup",
    "models/user_token"
  ], function(
    PopupView,
    AuthPopupView,
    UserToken
  ){

    $("#configs_button")
      .on("click", function() {
        chrome.tabs.create({ url: chrome.extension.getURL('options.html') });
        return false;
      });

    if (UserToken.current() == undefined) {
      return new AuthPopupView().render();
    } else {
      return new PopupView().render();
    }
  });
});

