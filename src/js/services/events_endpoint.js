define([], function() {
  return function(accountID) {
    return "https://basecamp.com/" + accountID + "/api/v1/events.json";
  };
});
