define(["backbone"], function() {
  return Backbone.Model.extend({
    getId: function () {
      return this.get("id");
    },
    getName: function () {
      return this.get("name");
    }
  });
});
