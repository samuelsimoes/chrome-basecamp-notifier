define([
  "services/configs_ignored_events",
  "models/user",
  "underscore"
], function(
  ConfigIgnoredEvents,
  User
) {

  var Filter = function(collection) {
    var that = this;
    this.collection = collection;

    this.collection.on("add", function(model) {
      that.model = model;

      if (that.isCreatedByMe() || that.isIgnoredType()) {
        that.collection.remove(model);
      } else {
        that.collection.trigger("filtrated-add", model);
      }
    });
  };

  Filter.prototype.isCreatedByMe = function() {
    return User.current().fullName() == this.model.get("creator").name;
  };

  Filter.prototype.isIgnoredType = function() {
    return _.contains(ConfigIgnoredEvents.ignoredEvents(), this.model.get("type"));
  };

  return {
    watch: function (collection) {
      return new Filter(collection);
    }
  };
});
