define([
  "react",
  "fluxo",
  "jsx!components/options/item_checkbox"
], function(
  React,
  Fluxo,
  ItemCheckbox
) {
  return React.createClass({
    toggleNotification: function () {
      Fluxo.callAction("ConfigsMisc", "toggleNotification");
    },

    render: function () {
      return (
        <ItemCheckbox onClick={this.toggleNotification}
                      checked={this.props.disableNotification}
                      label="Disable desktop notifications?" />
      );
    }
  });
});
