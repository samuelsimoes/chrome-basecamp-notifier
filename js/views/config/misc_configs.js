define([
  "views/config/notification_option",
  "backbone"
], function(
  NotificationOptionView
) {

  return Backbone.View.extend({
    render: function() {
      this.renderNotificationOption();
      return this;
    },

    renderNotificationOption: function() {
      var notificationOptionView = new NotificationOptionView().render();
      this.$el.append(notificationOptionView.el);
    }
  });
});
