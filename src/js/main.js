
require.config({
  baseUrl: "js",
  paths: {
    "jquery": "vendor/jquery/jquery",
    "underscore": "vendor/underscore-amd/underscore",
    "backbone": "vendor/backbone-amd/backbone",
    "text": "vendor/text/text",
    "jasmine": "vendor/jasmine/lib/jasmine-core/jasmine",
    "jasmine-html": "vendor/jasmine/lib/jasmine-core/jasmine-html",
    "easytab": "vendor/easytabs/lib/jquery.easytabs",
    "raven": "vendor/raven-js/dist/1.0.8/raven",
    "app": "app"
  },
  shim: {
    "easytab": {
      deps: ["jquery"]
    },
    "raven": {
      exports: "Raven"
    },
    "jasmine": {
      exports: "jasmine",
    },
    "jasmine-html": {
      deps: ["jasmine", "jquery"],
      exports: "jasmine"
    }
  }
});

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
