import { React } from "libs";
import PrettyDate from "services/pretty_date";

export default React.createClass({
  sendToBasecamp: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    chrome.tabs.create({ url: this.props.url });
  },

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
        <a className="send-to-basecamp-link bottom-link"
           href="#"
           onClick={this.sendToBasecamp}>
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

  renderErrorMessage: function() {
    return (
      <div className="comment-view">
        <p><i className="icon-remove icon-large"></i> {this.props.error}</p>
      </div>
    );
  },

  render: function() {
    if (this.props.content) {
      return this.renderCommentContent();
    } else if (this.props.error) {
      return this.renderErrorMessage();
    } else {
      return this.renderLoadingMessage();
    }
  }
});
