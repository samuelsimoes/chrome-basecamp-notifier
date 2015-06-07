define([
  "fluxo",
  "react",
  "jsx!components/options/item_checkbox"
], function(
  Fluxo,
  React,
  ItemCheckbox
) {
  return React.createClass({
    toggle: function (accountID) {
      Fluxo.callAction("ConfigsListenedAccounts", "toggle", accountID);
    },

    renderAccountOption: function(account) {
      return <ItemCheckbox onChange={this.toggle.bind(this, account.id)}
                           checked={account.listened}
                           key={account.id}
                           label={account.name} />;
    },

    render: function () {
      return (
        <div className="tab-content">
          {this.props.accounts.map(this.renderAccountOption)}
        </div>
      );
    }
  });
});
