import { React, Fluxo } from "libs";
import ListenedAccountsTab from "components/options/listened_accounts_tab";
import IgnoredEventsTab from "components/options/ignored_events_tab";
import IgnoredProjectsTab from "components/options/ignored_projects_tab";
import MiscTab from "components/options/misc_tab";

export default React.createClass({
  mixins: [Fluxo.WatchComponent],

  getInitialState: function() {
    return { currentTab: "listenedAccounts" };
  },

  listenProps: [
    "listenedAccounts",
    "ignoredEventTypes",
    "ignoredProjects",
    "misc"
  ],

  renderListenedAccounts: function () {
    if (this.state.currentTab !== "listenedAccounts") { return; }
    return <ListenedAccountsTab accounts={this.state.listenedAccounts.stores} />;
  },

  renderIgnoredEvents: function () {
    if (this.state.currentTab !== "ignoredEvents") { return; }
    return <IgnoredEventsTab eventTypes={this.state.ignoredEventTypes.stores} />;
  },

  renderIgnoredProjects: function () {
    if (this.state.currentTab !== "ignoredProjects") { return; }
    return <IgnoredProjectsTab projects={this.state.ignoredProjects.stores} />;
  },

  renderMisc: function () {
    if (this.state.currentTab !== "misc") { return; }
    return <MiscTab disableNotification={this.state.misc.disable_notifications} />;
  },

  setTab: function (key) {
    this.setState({ currentTab: key });
  },

  tabClass: function(tab) {
    var className = "tab";

    if (this.state.currentTab === tab) {
      className += " active";
    }

    return className;
  },

  render: function () {
    return (
      <div id="tab-container" className="tab-container">
        <ul className="etabs">
          <li className={this.tabClass("listenedAccounts")}
              onClick={this.setTab.bind(this, "listenedAccounts")}>
            Listened Accounts
          </li>
          <li className={this.tabClass("ignoredEvents")}
              onClick={this.setTab.bind(this, "ignoredEvents")}>
            Ignored Events
          </li>
          <li className={this.tabClass("ignoredProjects")}
              onClick={this.setTab.bind(this, "ignoredProjects")}>
            Ignored Projects
          </li>
          <li className={this.tabClass("misc")}
              onClick={this.setTab.bind(this, "misc")}>
            Misc
          </li>
        </ul>

        {this.renderListenedAccounts()}

        {this.renderIgnoredEvents()}

        {this.renderIgnoredProjects()}

        {this.renderMisc()}
      </div>
    );
  }
});
