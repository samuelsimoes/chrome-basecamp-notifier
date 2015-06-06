define([
  "services/object_local_storage"
], function(
  ObjectLocalStorage
) {
  return {
    initialize: function (miscStore) {
      this.miscStore = miscStore;

      this.miscStore.setAttribute(
        "disable_notifications",
        ObjectLocalStorage.getItem("miscConfigs", "disable_desktop_notifications")
      );
    },

    toggleNotification: function () {
      var notificationDisabled = this.miscStore.data.disable_notifications;

      ObjectLocalStorage.setItem("miscConfigs", "disable_desktop_notifications", !notificationDisabled);

      this.miscStore.setAttribute("disable_notifications", !notificationDisabled)
    }
  };
});
