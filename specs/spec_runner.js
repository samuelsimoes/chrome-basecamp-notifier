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

    specs.push("../specs/models/user");
    specs.push("../specs/models/event");
    specs.push("../specs/services/configs_ignored_events");
    specs.push("../specs/services/unread_events_cache");
    specs.push("../specs/collections/events");

    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
  });
});

