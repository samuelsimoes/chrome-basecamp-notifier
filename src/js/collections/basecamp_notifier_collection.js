define(["backbone"], function() {
  return Backbone.Collection.extend({
    initialize: function (models, options) {
      this.authToken = options.authToken;

      _.bindAll(this, "beforeSendRequest", "onSuccessfulRequest");
    },

    beforeSendRequest: function(requestOptions, xhr) {
      xhr.setRequestHeader("Authorization", ("Bearer " + this.authToken));

      // "fetchOnlyNewRecords" option gives you the possibility to recevei from
      // server only what you don't have fetched yet. If you send an
      // If-Modified-Since header wich flags what you already have on this
      // collection, the request returns a 303 HTTP status from Basecamp server.
      if (this.lastModificationFlagHeader && requestOptions.fetchOnlyNewRecords) {
        xhr.setRequestHeader("If-Modified-Since", this.lastModificationFlagHeader);
      }
    },

    onSuccessfulRequest: function(data, statusText, xhr) {
      this.lastModificationFlagHeader = xhr.getResponseHeader('Last-Modified');
    },

    fetch: function(options) {
      options = options || {};

      _.defaults(options, {
        beforeSend: _.partial(this.beforeSendRequest, options)
      });

      var fetchPromise = Backbone.Collection.prototype.fetch.call(this, options);

      fetchPromise.done(this.onSuccessfulRequest);

      return fetchPromise;
    }
  });
});
