require([
  "services/background",
  "services/config_page_mediator",
  "views/popup/popup",
  "app"
], function (
  Background,
  ConfigPageMediator,
  PopupView,
  App
) {
  var view = $("body").data("view");

  if (view == "options") {
    ConfigPageMediator.mediate();
  } else if (view == "popup") {
    new PopupView().render();
  } else if (view == "background") {
    Background();
  }
});
