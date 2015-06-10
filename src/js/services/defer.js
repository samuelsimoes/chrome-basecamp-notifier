define([], function() {
  return function() {
    var result = {};

    result.promise = new Promise(function(resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });

    return result;
  };
});
