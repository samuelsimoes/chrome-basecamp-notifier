define(["react", "underscore", "fluxo"], function (React, _, Fluxo) {
  return React.createClass({
    listenProps: ["contactForm"],

    mixins: [React.addons.LinkedStateMixin, Fluxo.WatchComponent],

    getInitialState: function() {
      return {};
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      Fluxo.callAction("ContactForm", "submit", this.state.contactForm);
    },

    onChange: function(attributeName, evt) {
      var value = evt.target.value,
          data = {};

      data[attributeName] = value;

      this.setState({ contactForm: _.extend({}, this.state.contactForm, data) });
    },

    render: function() {
      var loading = this.state.contactForm.loading,
          submitBtnText = loading ? "Sending..." : "Submit Feedback";

      return (
        <form onSubmit={this.onSubmit}>
          <textarea className="form-field"
                    maxLength="300"
                    required
                    value={this.state.contactForm.content}
                    onChange={this.onChange.bind(this, "content")}
                    rows="3"
                    placeholder="Any bug or suggestion? Send here!">
          </textarea>

          <input maxLength="40"
                 required
                 value={this.state.contactForm.email}
                 onChange={this.onChange.bind(this, "email")}
                 type="email"
                 className="form-field"
                 placeholder="Your email" />

          <input type="submit" value={submitBtnText} />
        </form>
      );
    }
  });
});
