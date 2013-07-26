define(["views/config/account", "backbone"], function(AccountView) {
  return Backbone.View.extend({
    render: function() {
      _.each(this.collection.models, function(account) {
        this.renderItem(account);
      }, this);
    },

    renderItem: function(account) {
      var item = new AccountView({ model: account });
      jQuery("#tabs1-accounts").append(item.render());
    }
  });
});
