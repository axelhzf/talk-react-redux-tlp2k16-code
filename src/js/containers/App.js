import React from "react";
import Toolbar from "../components/Toolbar";
import Header from "../components/Header";
import Search from "./Search";
import Favorite from "./Favorite";
import _ from "lodash";
import {connect} from "react-redux";
import Notification from "../components/Notification";
import * as actions from "../state/actions";
import {mouseTrap} from "react-mousetrap"

class App extends React.Component {
  
  onChangeTab = tab => {
    this.props.dispatch(actions.changeTab(tab));
  };
  
  render() {
    const {totalFavorites, notification, activeTab} = this.props;
    const toolbarItems = [
      {id: "search", iconClass: "fa fa-search", component: <Search/>},
      {id: "favorite", iconClass: "fa fa-heart", badge: totalFavorites, component: <Favorite/>},
    ];
    const toolbarItemsById = _.keyBy(toolbarItems, "id");
    const ActiveComponent = toolbarItemsById[activeTab].component;
    
    return (
      <div className="app">
        <Header/>
        <div className="content">
             {ActiveComponent}
        </div>
        <Toolbar items={toolbarItems} active={activeTab} onChange={this.onChangeTab}/>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    activeTab: state.tabs.active,
    totalFavorites: _.keys(state.favorites.ids).length
  }
};

export default connect(mapStateToProps)(App)
