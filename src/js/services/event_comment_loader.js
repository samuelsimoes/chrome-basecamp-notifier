define(["services/defer", "underscore", "services/authenticated_ajax"], function(Defer, _, AuthenticatedAjax) {
  return function(eventData) {
    var endpoint = (eventData.url),
        commentAnchor = eventData.html_url.split("#")[1],
        commentID;

    var defer = Defer();

    if (commentAnchor) {
      commentID = parseInt(commentAnchor.split("_")[1], 10);
    }

    var eventLoadingPromise = AuthenticatedAjax(endpoint);

    eventLoadingPromise.then(function(eventData) {
      var commentData;

      if (commentID) {
        commentData = _.findWhere(eventData.comments, { id: commentID });
      } else {
        commentData = eventData.comments[0];
      }

      if (commentData) {
        defer.resolve(commentData);
      } else {
        defer.reject({ deleted: true });
      }

    }, defer.reject);

    return defer.promise;
  };
});
