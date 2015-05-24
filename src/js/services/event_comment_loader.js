define(["jquery", "underscore", "services/authenticated_ajax"], function($, _, AuthenticatedAjax) {
  return function(eventData) {
    var endpoint = (eventData.url),
        commentAnchor = eventData.html_url.split("#")[1],
        commentID;

    var defer = $.Deferred();

    if (commentAnchor) {
      commentID = parseInt(commentAnchor.split("_")[1], 10);
    }

    var eventLoadingPromise = AuthenticatedAjax(endpoint);

    eventLoadingPromise.done(function(eventData) {
      var commentData;

      if (commentID) {
        commentData = _.findWhere(eventData.comments, { id: commentID });
      } else {
        commentData = eventData.comments[0];
      }

      defer.resolve(commentData);
    });

    eventLoadingPromise.fail(defer.fail);

    return defer.promise();
  };
});
