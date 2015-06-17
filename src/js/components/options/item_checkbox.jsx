import { React } from "libs";

export default React.createClass({
  componentWillMount: function() {
    this.randomID = Math.random().toString().substr(2, 6);
  },

  renderInput: function () {
    if (this.props.loading) {
      return <i className="icon-spinner icon-spin icon-large"></i>;
    } else {
      return <input type="checkbox"
                    id={this.randomID}
                    onChange={this.props.onChange}
                    checked={this.props.checked} />;
    }
  },

  render: function () {
    return (
      <div className="checkbox-ctn">
        {this.renderInput()} <label htmlFor={this.randomID}>{this.props.label}</label>
      </div>
    );
  },
});
