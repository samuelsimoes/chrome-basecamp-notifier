import Popup from "popup";
import Options from "options";
import Background from "background";

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
