import React from "react";
import GifList from "../components/GifList";
import * as actions from "../state/actions";
import {connect} from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import ErrorMessage from "../components/ErrorMessage";
import gifs from "../fixtures/gifs";

export default class Favorite extends React.Component {
  
  render() {
    const query = "";
    const content = <GifList items={gifs} onToggleFav={this.onToggleFav} onCopy={this.onCopy}/>
    return (
      <div className="favorite">
           {content}
      </div>
    )
  }
  
}

