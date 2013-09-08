define([
  "services/configs_base",
  "backbone"
], function(
  ConfigsBase
) {

  var base = new ConfigsBase("ignoredProjects", []);
  var module = {};

  module.ignoredProjectsIds = function() {
    return base.get();
  };

  module.toggle = function(project) {
    var ignoredProjectsIds = this.ignoredProjectsIds();

    if (this.isIgnored(project)) {
      ignoredProjectsIds = _.difference(ignoredProjectsIds, [project.getId()]);
    } else {
      ignoredProjectsIds = _.union(ignoredProjectsIds, [project.getId()]);
    }

    base.save(ignoredProjectsIds);
  };

  module.isIgnored = function(project) {
    return _.contains(this.ignoredProjectsIds(), project.getId());
  };

  return module;
});
