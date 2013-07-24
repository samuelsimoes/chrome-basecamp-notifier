require(["common"], function (common) {
  require(["views/popup"], function(PopupView){
    return new PopupView().render();
  });
});

