import Defer from "services/defer";

var QueryStringify = function(data) {
  var fragments = [];

  for (var fragmentKey in data) {
    var fragmentValue = data[fragmentKey];

    if (fragmentValue) {
      fragments.push(fragmentKey + "=" + fragmentValue);
    }
  }

  return encodeURI(fragments.join("&"));
};

export default function(options) {
  var defer = Defer(),
      request = new XMLHttpRequest();

  request.timeout = (options.timeout || 20000);

  var url = options.url;

  if (options.queryString) {
    url += ("?" + QueryStringify(options.queryString || {}));
  }

  request.open((options.method || "GET"), url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.responseType = (options.responseType || "json");

  var headers = (options.headers || {});

  for (var headerName in headers) {
    var header = headers[headerName];
    request.setRequestHeader(headerName, header);
  }

  request.ontimeout = function() {
    defer.reject(request);
  };

  request.onerror = function() {
    defer.reject(request);
  };

  request.onload = function() {
    if (request.status >= 100 && request.status < 400){
      defer.resolve(request);
    } else {
      defer.reject(request);
    }
  };

  request.send(QueryStringify(options.data || {}));

  return defer.promise;
};
