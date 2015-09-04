import { React } from "libs";
import Event from "components/popup/event";

export default React.createClass({
  renderEvent: function(data) {
    return <Event {...data} actions={this.props.action} key={data.id} />;
  },

  renderEvents: function() {
    return (
      <ul className="notification-list">
        {this.props.events.map(this.renderEvent)}
      </ul>
    );
  },

  renderBlankSlate: function() {
    return (
      <div className="notification-list-blank-slate">
        <i className="icon icon-remove-sign"></i>
        Sorry, no events here.
      </div>
    );
  },

  render: function() {
    return this.props.events.length ? this.renderEvents() : this.renderBlankSlate();
  }
});
