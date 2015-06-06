define(["jquery", "underscore", "services/user_token"], function($, _, UserToken) {
  return function(url, options) {
    var defer = $.Deferred(),
        options = options ? options : {};

    options.headers = _.extend({
      "Authorization": ("Bearer " + UserToken.current())
    }, options.headers);

    options = _.defaults(options, {
      url: url,
      success: function(data, textStatus, jqXHR) {
        defer.resolve(data, jqXHR.getResponseHeader("Last-Modified"));
      },
      error: defer.reject,
      complete: defer.always
    });

    $.ajax(options);

    return defer.promise();
  };
});
