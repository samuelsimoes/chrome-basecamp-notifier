define(["services/events_loader"], function(EventsLoader) {
  var POOLING_INTERVAL_IN_SECONDS = 60;

  return function(accountID, since, successCallback, errorCallback) {
    var OnLoadEvents = function(request) {
      var eventsData = request.response;

      if (eventsData.length) {
        since = eventsData[0].created_at;
      }

      successCallback(eventsData);
    };

    var LoadItems = function() {
      EventsLoader(accountID, { since: since }).then(OnLoadEvents, errorCallback);
    };

    LoadItems();

    return setInterval(LoadItems, (POOLING_INTERVAL_IN_SECONDS * 1000));
  };
});
