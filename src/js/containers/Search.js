import React from "react";
import SearchBox from "../components/SearchBox";
import GifList from "../components/GifList";
import _ from "lodash";
import {connect} from "react-redux";
import * as actions from "../state/actions";
import LoadingIndicator from "../components/LoadingIndicator";
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import ErrorMessage from "../components/ErrorMessage";
import gifs from "../fixtures/gifs";

export default class Search extends React.Component {
  
  onChangeQuery = query => {
    console.log("Change query", query)
  };
  
  render() {
    const query = "";
    const content = <GifList items={gifs} onToggleFav={this.onToggleFav} onCopy={this.onCopy}/>
    
    return (
      <div className="search">
        <SearchBox onChange={this.onChangeQuery} initialValue={query}/>
        <div className="search-content">
             {content}
        </div>
      </div>
    )
  }
  
}

