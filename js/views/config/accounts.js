define([
  "views/config/account",
  "backbone"
], function(AccountView) {
  return Backbone.View.extend({
    render: function() {
      _.each(this.collection.models, function(account) {
        this.renderItem(account);
      }, this);

      return this;
    },

    renderItem: function(account) {
      var item = new AccountView({ model: account });
      this.$el.append(item.render());
    }
  });
});
