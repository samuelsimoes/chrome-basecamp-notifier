define([
  "collections/events",
  "services/unread_events_cache",
  "services/badge",
  "services/configs_misc",
  "services/desktop_notifier"
], function(
  Events,
  UnreadEventsCache,
  Badge,
  ConfigsMisc,
  DesktopNotifier
) {

  var AccountStream = function (account, userToken, dispatcher, filter) {
    var that = this;
    this.firstTime = true;
    this.dispatcher = dispatcher;
    this.events = new Events([], {
      account: account,
      userToken: userToken
    });

    if (filter != undefined) {
      filter.watch(this.events);
    }

    this.events.on("sync", function () {
      that.firstTime = false;
      this.updateCache();
    });

    this.attachNewItemHandler();
    this.attachErrorHandler();
  };

  AccountStream.prototype.start = function () {
    this.events.startStream();
  };

  AccountStream.prototype.attachErrorHandler = function () {
    this.events.on("error", function (model, xhr) {
      this.dispatcher.trigger("stream-error", xhr);
    }, this);
  };

  AccountStream.prototype.attachNewItemHandler = function () {
    this.events.on("filtrated-add", function (eventItem) {
      if(this.firstTime) {
        return;
      }

      UnreadEventsCache.addItem(eventItem);
      Badge.update(UnreadEventsCache.unredItemsCount());

      if(!ConfigsMisc.disabledDesktopNotifications()) {
        DesktopNotifier.notify(eventItem);
      };
    }, this);
  };

  AccountStream.prototype.stop = function () {
    this.events.stopStream();
  };

  return AccountStream;
});
