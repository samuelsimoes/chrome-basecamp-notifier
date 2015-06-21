import { React, Fluxo, _ } from "libs";

export default React.createClass({
  onSubmit: function (evt) {
    evt.preventDefault();
    Fluxo.callAction("ContactForm", "submit");
  },

  onChange: function(attributeName, evt) {
    var value = evt.target.value,
        data = {};

    data[attributeName] = value;

    Fluxo.callAction("ContactForm", "updateData", _.extend({}, this.props.contactForm, data));
  },

  render: function() {
    var loading = this.props.contactForm.loading,
        submitBtnText = loading ? "Sending..." : "Submit Feedback";

    return (
      <form onSubmit={this.onSubmit}>
        <textarea className="form-field"
                  maxLength="300"
                  required
                  value={this.props.contactForm.content}
                  onChange={this.onChange.bind(this, "content")}
                  rows="3"
                  placeholder="Any bug or suggestion? Send here!">
        </textarea>

        <input maxLength="40"
               required
               value={this.props.contactForm.email}
               onChange={this.onChange.bind(this, "email")}
               type="email"
               className="form-field"
               placeholder="Your email" />

        <input type="submit" value={submitBtnText} />
      </form>
    );
  }
});
