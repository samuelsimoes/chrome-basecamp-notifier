import { React } from "libs";
import Text from "services/text";
import PrettyDate from "services/pretty_date";
import Comment from "components/popup/comment";

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return { showingComment: false };
  },

  toggleStar: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var actionName = (this.props.starred) ? "unstarEvent" :  "starEvent";

    this.props.actions[actionName](this.props.id);
  },

  presentableSummary: function() {
    var treatedsummary = Text.stripTags(this.props.summary);

    treatedsummary = Text.unescapeHTML(treatedsummary);

    var creatornamelength = this.props.creatorName.length,
        summarylength = (105 - creatornamelength);

    return Text.truncate(treatedsummary, summarylength, "...");
  },

  onClick: function() {
    if (this.props.isComment) {
      this.setState({ showingComment: !this.state.showComment });

      if (!this.state.showingComment) {
        this.props.loadComment(this.props.id, this.props.tabName);
      }
    } else {
      chrome.tabs.create({ url: this.props.html_url });
    }
  },

  renderComment: function() {
    if (!this.state.showingComment) { return; }
    return <Comment error={this.props.commentErrorLoading}
                    {...this.props.comment}
                    url={this.props.html_url} />;
  },

  render: function() {
    var iconClasses = React.addons.classSet("icon", this.props.icon),
        startIconClasses = React.addons.classSet({
          "icon": true,
          "icon-star": this.props.starred,
          "icon-star-empty": !this.props.starred
        }),
        containerClasses = React.addons.classSet({
          "event-view": true,
          "unread": (this.props.unread && !this.props.starred)
        });

    return (
      <li onClick={this.onClick} className={containerClasses}>
        <div className="first-line">
          <img src={this.props.creatorImage} className="creator-avatar" alt="" />

          <div className="icons-container">
            <i className={iconClasses}></i>

            <a href="#" className="star-item" onClick={this.toggleStar}>
              <i className={startIconClasses}></i>
            </a>
          </div>

          <div className="summary">
            {this.props.creatorName} {this.presentableSummary()}
          </div>

          <div className="meta-infos">
            <p>
              <i className="icon-time"></i> {PrettyDate(this.props.created_at)}
            </p>

            <p>
              <i className="icon-suitcase"></i> {this.props.bucketName}
            </p>
          </div>
        </div>
        {this.renderComment()}
      </li>
    );
  }
});
