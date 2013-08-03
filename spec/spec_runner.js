require(["../js/common"], function (common) {
  require(["jasmine", "jasmine-html"], function(){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push("../spec/models/user_spec");
    specs.push("../spec/models/event_spec");
    specs.push("../spec/services/configs_ignored_events_spec");
    specs.push("../spec/services/unread_events_cache_spec");
    specs.push("../spec/collections/events_spec");

    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
  });
});

