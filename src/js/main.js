require([
  "services/background",
  "services/config_page_mediator",
  "jsx!popup",
  "app"
], function (
  Background,
  ConfigPageMediator,
  Popup,
  App
) {
  var view = $("body").data("view");

  if (view == "options") {
    ConfigPageMediator.mediate();
  } else if (view == "popup") {
    Popup();
  } else if (view == "background") {
    Background();
  }
});
