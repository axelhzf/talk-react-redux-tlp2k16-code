import React from "react";
import GifList from "../components/GifList";
import * as actions from "../state/actions";
import {connect} from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import ErrorMessage from "../components/ErrorMessage";
import gifs from "../fixtures/gifs";

class Favorite extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(actions.fetchFavorites());
  }
  
  onToggleFav = gif => {
    this.props.dispatch(actions.toggleFav(gif.id));
  };
  
  render() {
    const {gifs, isFetching, error} = this.props;
    let content;
    if (isFetching) {
      content = <LoadingIndicator/>
    } else if (error) {
      content = <ErrorMessage msg={error}/>
    } else if (gifs.length === 0) {
      content = <EmptyPlaceholder msg={"Search and mark some gifs as favorites"}/>
    } else {
      content = <GifList items={gifs} onToggleFav={this.onToggleFav} onCopy={this.onCopy}/>
    }
    return (
      <div className="favorite">
        {content}
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  
  const gifs = _.map(_.keys(state.favorites.ids), id => {
    return {
      isFavorite: true,
      ...state.gifs[id]
    };
  });
  
  return {
    isFetching: state.favorites.isFetching,
    gifs,
    error: state.favorites.error
  }
};

export default connect(mapStateToProps)(Favorite)
