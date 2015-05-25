define(["services/events_loader"], function(EventsLoader) {
  var POOLING_INTERVAL_IN_SECONDS = 60;

  return function(accountID, since, onLoadCallback) {
    var onLoadEventsData = function(eventsData) {
      if (eventsData[0]) {
        since = eventsData[0].created_at;
      }

      onLoadCallback.call(null, eventsData);
    };

    var loadItems = function() {
      EventsLoader(accountID, { data: { since: since }}).done(onLoadEventsData);
    };

    loadItems();

    var intervalID = setInterval(loadItems, (POOLING_INTERVAL_IN_SECONDS * 1000));

    return intervalID;
  };
});
