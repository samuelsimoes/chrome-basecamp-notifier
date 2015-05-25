define([
  "react",
  "fluxo",
  "services/text",
  "services/pretty_date",
  "services/event_type",
  "jsx!components/popup/comment"
], function(
  React,
  Fluxo,
  Text,
  PrettyDate,
  EventType,
  Comment
) {
  return React.createClass({
    mixins: [React.addons.PureRenderMixin],

    componentWillMount: function() {
      this.actionHandlerIdentifier = ("Events" + this.props.accountID);
      this.eventTypeInfos = EventType.discoverAndGetInfos(this.props.action);
    },

    toggleStar: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var actionName = (this.props.starred) ? "unstarEvent" :  "starEvent";

      Fluxo.callAction(this.actionHandlerIdentifier, actionName, this.props.id);
    },

    presentableSummary: function() {
      var treatedsummary = Text.stripTags(this.props.summary),
          treatedsummary = Text.unescapeHTML(treatedsummary);

      var creatornamelength = this.props.creatorName.length,
          summarylength = (105 - creatornamelength);

      return Text.truncate(treatedsummary, summarylength, "...");
    },

    onClick: function() {
      if (this.eventTypeInfos.key === "comment") {
        var actionName = this.props.showingComment ? "hideComment" : "showComment";
        Fluxo.callAction(this.actionHandlerIdentifier, actionName, this.props.id);
      } else {
        chrome.tabs.create({ url: this.props.html_url });
      }
    },

    renderComment: function() {
      if (!this.props.showingComment) { return; }
      return <Comment {...this.props.comment} url={this.props.html_url} />;
    },

    render: function() {
      var iconClasses = React.addons.classSet("icon", this.eventTypeInfos.icon),
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
      )
    }
  });
});
