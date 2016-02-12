import EventsEndpoint from "services/events_endpoint";
import AuthenticatedAjax from "services/authenticated_ajax";
import Defer from "services/defer";

/**
 * Sadly it's one of most complicated routines of the app.
 *
 * First of all, Basecamp only returns 50 items per page, so, remember that.
 *
 * Imagine that you stay way from you computer for a couple hours and while this your team 
 * generate more than 50 events. On this situation we need make a request to events endpoint
 * since the last event date passed on the arguments and verify if the payload has a subsequent 
 * page to load the remaining events and it must be recursive, once this away time may generated 
 * many pages.
 *
 * Important: if the "since" argument isn't present (most common on the first
 * app request) the routine finish on the first payload.
 */
export default function(accountID, options) {
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
