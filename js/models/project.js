define([
  "backbone"
], function(
) {

  return Backbone.Model.extend({
    getName: function () {
      return this.get("name");
    },

    getId: function () {
      return this.get("id");
    }
  });
});
