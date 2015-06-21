import Ajax from "services/ajax";

export default {
  initialize: function (contactFormStore) {
    this.contactFormStore = contactFormStore;
  },

  updateData: function(data) {
    this.contactFormStore.set(data);
  },

  submit: function () {
    var request = Ajax({
      url: "@@contactSupportEndpoint",
      data: this.contactFormStore.data,
      method: "POST"
    });

    this.contactFormStore.setAttribute("loading", true);

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
