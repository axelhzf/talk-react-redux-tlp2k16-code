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

export default class App extends React.Component {
  
  state =  {
    activeTab: "search"
  };
  
  onChangeTab = newActiveTab => {
    this.setState({activeTab: newActiveTab});
  };
  
  render() {
    const {activeTab} = this.state;
    const {totalFavorites, notification} = this.props;
    const toolbarItems = [
      {id: "search", iconClass: "fa fa-search", component: <Search/>},
      {id: "favorite", iconClass: "fa fa-heart", badge: "0", component: <Favorite/>},
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
