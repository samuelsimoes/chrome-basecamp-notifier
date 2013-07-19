(function(){
  Backbone.fetchCache.getCacheKey = function(instance, options) {
    var model = instance.__proto__.constructor.modelType;

    if (model != undefined) {
      return model;
    } else {
      return instance.constructor.name + ':' + instance.get("id");
    }
  };

  var configView = new BasecampNotifier.ConfigView();

  configView.render();
})();
