define([
  "text!templates/projects_list.html",
  "views/config/project",
  "services/configs_ignored_projects",
  "backbone"
], function(
  ProjectListTpl,
  ProjectView,
  ConfigsIgnoredProjects
) {

  return Backbone.View.extend({
    template: _.template(ProjectListTpl),

    render: function () {
      this.$el.html(this.template({
        account_name: this.options.account.getName()
      }));

      _.each(this.collection.models, function (project) {
        this.renderItem(project);
      }, this);

      return this;
    },

    renderItem: function (project) {
      var projectView =
        new ProjectView({
          model: project,
          selected: ConfigsIgnoredProjects.isIgnored(project)
        }).render();

      this.$el.find(".projects").append(projectView.el);
    }
  });
});
