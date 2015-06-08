define([
  "services/ajax",
  "underscore",
  "services/user_token"
], function(
  Ajax,
  _,
  UserToken
) {
  return function(url, options) {
    options = (options || {});

    options.headers = _.extend({
      "Authorization": ("Bearer " + UserToken.current())
    }, options.headers);

    options = _.defaults(options, { url: url });

    return Ajax(options);
  };
});
