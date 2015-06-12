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
    toggle: function (account) {
      var action = account.listened ? "unlisten" : "listen";
      Fluxo.callAction("ConfigsListenedAccounts", action, account.id);
    },

    renderAccountOption: function(account) {
      return <ItemCheckbox onChange={this.toggle.bind(this, account)}
                           loading={account.loading}
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
