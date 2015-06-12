define([
  "react",
  "fluxo",
  "jsx!components/popup/events"
], function(
  React,
  Fluxo,
  Events
) {
  return React.createClass({
    mixins: [Fluxo.WatchComponent],

    listenProps: ["events", "starredEvents"],

    getInitialState: function() {
      return { currentShowing: "events" };
    },

    renderEvents: function() {
      if (this.state.currentShowing !== "events") { return; }

      return (
        <div className="latest-notifications tab-content">
          <Events accountID={this.props.id} events={this.state.events.stores} />
        </div>
      );
    },

    renderStarred: function() {
      if (this.state.currentShowing !== "starred-events") { return; }

      return (
        <div className="latest-notifications tab-content">
          <Events accountID={this.props.id} events={this.state.starredEvents.stores} />
        </div>
      );
    },

    showEvents: function(evt) {
      evt.preventDefault();
      this.setState({ currentShowing: "events" });
    },

    showStarredEvents: function(evt) {
      evt.preventDefault();
      this.setState({ currentShowing: "starred-events" });
    },

    renderClearButton: function () {
      if (!this.state.events.stores.length || this.state.currentShowing !== "events") { return; }

      return <button onClick={this.clear} className="button-1 close-btn">Clear</button>;
    },

    clear: function () {
      Fluxo.callAction(("Events" + this.props.id), "clearLastEvents");
    },

    render: function() {
      var eventsTabClasses =
        React.addons.classSet({
          tab: true,
          active: (this.state.currentShowing === "events")
        });

      var starredEventsTabClasses =
        React.addons.classSet({
          tab: true,
          active: (this.state.currentShowing === "starred-events")
        });

      return (
        <div className="account">
          <h1>{this.props.name}</h1>

          {this.renderClearButton()}

          <ul className="etabs">
            <li className={eventsTabClasses}>
              <a onClick={this.showEvents} href="#">Latest Events</a>
            </li>
            <li className={starredEventsTabClasses}>
              <a onClick={this.showStarredEvents} href="#">Starred Events</a>
            </li>
          </ul>

          {this.renderEvents()}

          {this.renderStarred()}
        </div>
      );
    }
  });
});
