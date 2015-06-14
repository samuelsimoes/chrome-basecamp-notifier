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

    eventLoadingPromise.then(function(request) {
      var eventData = request.response,
          commentData;

      if (commentID) {
        commentData = _.findWhere(eventData.comments, { id: commentID });
      } else {
        commentData = eventData.comments[0];
      }

      if (commentData) {
        defer.resolve({ response: commentData });
      } else {
        request.deleted = true;
        defer.reject(request);
      }

    }, defer.reject);

    return defer.promise;
  };
});
