require([
  "services/background",
  "services/config_page_mediator",
  "views/popup/popup",
  "app",
  "raven"
], function (
  Background,
  ConfigPageMediator,
  PopupView,
  App,
  Raven
) {
  Raven.config(App.sentryUrl).install();

  var view = $("body").data("view");

  if (view == "options") {
    ConfigPageMediator.mediate();
  } else if (view == "popup") {
    new PopupView().render();
  } else if (view == "background") {
    Background();
  }
});
