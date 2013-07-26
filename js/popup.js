require(["common"], function (common) {
  require(["views/popup/popup"], function(PopupView){
    return new PopupView().render();
  });
});

