define([
  "views/popup/account",
  "backbone"
], function(AccountView) {
  return Backbone.View.extend({
    el: jQuery("#content"),

    render: function() {
      _.each(this.collection.models, function(account) {
        this.renderItem(account);
      }, this);
    },

    renderItem: function(account) {
      var item = new AccountView({ model: account });
      this.$el.append(item.render().el);
    }
  });
});
