import { React, Fluxo } from "libs";
import ItemCheckbox from "components/options/item_checkbox";

export default React.createClass({
  toggleNotification: function () {
    Fluxo.callAction("ConfigsMisc", "toggleNotification");
  },

  render: function () {
    return (
      <ItemCheckbox onChange={this.toggleNotification}
                    checked={this.props.disableNotification}
                    label="Disable desktop notifications?" />
    );
  }
});
