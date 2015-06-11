define(["services/defer"], function(Defer) {
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

  return function(options) {
    var defer = Defer(),
        request = new XMLHttpRequest();

    request.timeout = (options.timeout || 4000);

    var url = options.url;

    if (options.queryString) {
      url += ("?" + QueryStringify(options.queryString || {}));
    }

    request.open((options.method || "GET"), url, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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
      var response = request.responseText;

      try {
        response = JSON.parse(response);
      } catch (e) {}

      if (request.status >= 100 && request.status < 400){
        defer.resolve(response, request);
      } else {
        defer.reject(response, request);
      }
    };

    request.send(QueryStringify(options.data || {}));

    return defer.promise;
  };
});
