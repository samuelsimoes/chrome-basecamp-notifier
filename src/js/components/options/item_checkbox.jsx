define(["react"], function(React) {
  return React.createClass({
    render: function () {
      var random = Math.random().toString().substr(2, 6);

      return (
        <div className="checkbox-ctn">
          <input type="checkbox"
                 id={random}
                 onChange={this.props.onChange}
                 checked={this.props.checked} />
          <label htmlFor={random}>{this.props.label}</label>
        </div>
      );
    },
  });
});
