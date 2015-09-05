export default function (promise, store) {
  promise.then(function(request) {
    store.setComment(request.response);
  }, function(request) {
    var loadError;

    if (request.deleted) {
      loadError = "Can't fetch the comment. Maybe it was deleted.";
    } else {
      loadError = "Can't fetch the comment, try again.";
    }

    store.setCommentLoadError(loadError);
  });
};
