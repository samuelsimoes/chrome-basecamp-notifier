define(["services/ajax"], function (Ajax) {
  return {
    initialize: function (contactFormStore) {
      this.contactFormStore = contactFormStore;
    },

    submit: function (data) {
      var request = Ajax({
        url: "@@contactSupportEndpoint",
        data: data,
        method: "POST"
      });

      data.loading = true;

      this.contactFormStore.set(data);

      var onSend = function() {
        alert("Thank you for your feedback.");
        this.contactFormStore.set({ content: "", email: "" });
      };

      var onError = function(request) {
        if (request.status === 422) {
          alert(request.response.join("\n"));
        } else {
          alert("Can't sent the message.")
        }
      };

      request
        .then(onSend.bind(this), onError)
        .then(function() {
          this.contactFormStore.setAttribute("loading", false);
        }.bind(this));
    }
  };
});
