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
    "app": "app"
  },
  shim: {
    "easytab": {
      deps: ["jquery"]
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
  "views/popup/auth_popup",
  "models/user_token"
], function (
  Background,
  ConfigPageMediator,
  PopupView,
  AuthPopupView,
  UserToken
) {
  var view = $("body").data("view");

  if (view == "options") {
    ConfigPageMediator.mediate();
  } else if (view == "popup") {
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
  } else if (view == "background") {
    Background();
  }
});
