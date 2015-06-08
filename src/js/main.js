define([
  "popup",
  "options",
  "background"
], function(
  Popup,
  Options,
  Background
) {
  switch (window.location.pathname) {
    case "/background.html":
      Background();
      break;
    case "/options.html":
      Options();
      break;
    case "/popup.html":
      Popup();
      break;
  }
});
