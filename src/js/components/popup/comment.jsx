define([
  "react",
  "services/pretty_date",
], function(
  React,
  PrettyDate
) {
  return React.createClass({
    renderCommentContent: function() {
      return (
        <div className="comment-view">
          <img src={this.props.creator.avatar_url} className="creator-avatar" />
          <div className="content ballon">
            <span className="text" dangerouslySetInnerHTML={{__html: this.props.content}}/>
            <span className="time">{PrettyDate(this.props.created_at)}</span>
          </div>

          <a className="close-link bottom-link" href="#">
            Close <i className="icon-remove"></i>
          </a>
          <a className="send-to-basecamp-link bottom-link" href="#">
            View on Basecamp <i className="icon-share-alt"></i>
          </a>
        </div>
      );
    },

    renderLoadingMessage: function() {
      return (
        <div className="comment-view">
          <p><i className="icon-spinner icon-spin icon-large"></i> Loading...</p>
        </div>
      );
    },

    render: function() {
      if (this.props.content) {
        return this.renderCommentContent();
      } else {
        return this.renderLoadingMessage();
      }
    }
  });
});
