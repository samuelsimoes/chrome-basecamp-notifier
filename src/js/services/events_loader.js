define([
  "services/events_endpoint",
  "services/authenticated_ajax",
  "services/defer"
], function(
  EventsEndpoint,
  AuthenticatedAjax,
  Defer
) {
  /**
   * Sadly it's one of most complicated routines of the app.
   *
   * First of all, Basecamp only returns 50 items per page, so, remember that.
   *
   * Imagine that you stay way from you computer for a couple hours and while it
   * away time your team generate more than 50 events. So you need make a request
   * to events endpoint since the last event passed on the arguments and verifies if it
   * has a subsequent page to load the remaining events and it must be recursive,
   * once the away time can generated an unknow amount of pages.
   *
   * Important notice that if the "since" isn't present (most common on the first
   * app request) the routine finish on the first payload.
   */
  return function(accountID, options) {
    var defer = Defer(),
        options = options || {},
        since = options.since,
        url = EventsEndpoint(accountID);

    var OnError = function(data, request) {
      if (request.status === 404) {
        defer.resolve({ response: data });
      } else {
        defer.reject(request);
      }
    };

    var OnLoad = function(aggregatedData, page, request) {
      var eventsData = request.response;

      aggregatedData = aggregatedData.concat(eventsData);

      if (eventsData.length < 50 || !since) {
        defer.resolve({ response: aggregatedData });
      } else {
        var nextPage = (page + 1);

        AuthenticatedAjax(url, {
          queryString: { since: since, page: nextPage }
        }).then(
          OnLoad.bind(null, aggregatedData, nextPage),
          OnError.bind(null, aggregatedData)
        );
      }
    };

    AuthenticatedAjax(url, {
      queryString: { since: options.since }
    }).then(
      OnLoad.bind(null, [], 1),
      OnError.bind(null, null)
    );

    return defer.promise;
  };
});
