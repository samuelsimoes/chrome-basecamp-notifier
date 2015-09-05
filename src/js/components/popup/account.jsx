import { React } from "libs";
import Events from "components/popup/events";

export default React.createClass({
  getInitialState: function() {
    return { currentShowing: "events" };
  },

  renderEvents: function() {
    if (this.state.currentShowing !== "events") { return; }

    return (
      <div className="latest-notifications tab-content">
        <Events actions={this.props.actions} events={this.props.events.stores} tabName="events" />
      </div>
    );
  },

  renderStarred: function() {
    if (this.state.currentShowing !== "starred-events") { return; }

    return (
      <div className="latest-notifications tab-content">
        <Events actions={this.props.actions} events={this.props.starredEvents.stores} tabName="starredEvents" />
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
    if (!this.props.events.stores.length || this.state.currentShowing !== "events") { return; }

    return <button onClick={this.clear} className="button-1 close-btn">Clear</button>;
  },

  clear: function () {
    this.props.actions.clearLastEvents();
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
