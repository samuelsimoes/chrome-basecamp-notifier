require(["common"], function (common) {
  require(["views/config"], function(ConfigView, UserToken){
    new ConfigView().render();
  });
});

