import { React, Fluxo } from "libs";
import ItemCheckbox from "components/options/item_checkbox";

export default React.createClass({
  toggle: function (eventType) {
    Fluxo.callAction("ConfigsIgnoredEventsTypes", "toggle", eventType);
  },

  renderEventOption: function(eventType) {
    return <ItemCheckbox onChange={this.toggle.bind(this, eventType.key)}
                         key={eventType.key}
                         checked={eventType.ignored}
                         label={eventType.label} />;
  },

  render: function () {
    return (
      <div className="tab-content">
        <div className="message">
          <i className="icon-exclamation"></i> Only will affects new events
        </div>
        {this.props.eventTypes.map(this.renderEventOption)}
      </div>
    );
  }
});
