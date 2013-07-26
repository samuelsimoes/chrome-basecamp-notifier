require(["common"], function (common) {
  require(["services/config_page_mediator"], function(ConfigPageMediator){
    ConfigPageMediator.mediate();
  });
});

