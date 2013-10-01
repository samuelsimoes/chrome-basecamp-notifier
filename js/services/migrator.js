define([], function() {

  return function() {
    if (localStorage.getItem("currentVersion") == "1.5.0" && localStorage.getItem("refreshToken") == undefined) {
      localStorage.removeItem("currentToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");
    }
  };
});
