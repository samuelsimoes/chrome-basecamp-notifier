define([
  "text!templates/checkbox.html",
  "services/configs_ignored_projects",
  "backbone"
], function(
  CheckboxTpl,
  ConfigsIgnoredProjects
) {

  return Backbone.View.extend({
    template: _.template(CheckboxTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function () {
      var view = this.template({
        selected: this.options.selected,
        label: this.model.getName()
      });

      this.setElement(view);

      return this;
    },

    updateStatus: function() {
      ConfigsIgnoredProjects.toggle(this.model);
    }
  });
});
