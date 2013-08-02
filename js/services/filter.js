define([], function() {

  var Filter = function(collection) {
    var that = this;
    this.collection = collection;

    this.collection.on("add", function(model) {
      if (that.isCreatedByMe(model) || that.isIgnoredType(model)) {
        that.collection.remove(model);
      } else {
        that.collection.trigger("filteredAdd", model);
      }
    });
  };

  Filter.prototype.isCreatedByMe = function() {
    return false;
  };

  Filter.prototype.isIgnoredType = function() {
    return false;
  };

  return Filter;
});
