define(["text!templates/account.html", "backbone"], function(AccountTpl) {
  return Backbone.View.extend({
    template: _.template(AccountTpl),

    events: {
      "click :checkbox": "updateStatus"
    },

    render: function() {
      var view = this.template(this.model.toJSON());

      this.setElement(view);

      return this.el;
    },

    selected: function() {
    },

    updateStatus: function() {
      console.log("mudou");
    }
  });
});
