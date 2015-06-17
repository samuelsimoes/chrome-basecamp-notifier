import { _ } from "libs";
import Ajax from "services/ajax";
import UserToken from "services/user_token";

export default function(url, options) {
  options = (options || {});

  options.headers = _.extend({
    "Authorization": ("Bearer " + UserToken.current())
  }, options.headers);

  options = _.defaults(options, { url: url });

  return Ajax(options);
};
