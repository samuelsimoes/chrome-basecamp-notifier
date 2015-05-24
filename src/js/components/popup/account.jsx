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
