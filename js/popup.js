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
    if (UserToken.current() == undefined) {
      return new AuthPopupView().render();
    } else {
      return new PopupView().render();
    }
  });
});

