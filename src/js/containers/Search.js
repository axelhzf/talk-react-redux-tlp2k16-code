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

class Search extends React.Component {
  
  componentDidMount() {
    const {query} = this.props;
    this.props.dispatch(actions.fetchSearch(query));
  }
  
  onChangeQuery = query => {
    this.props.dispatch(actions.fetchSearch(query));
  };
  
  onToggleFav = gif => {
    this.props.dispatch(actions.toggleFav(gif.id));
  };
  
  onCopy = gif => {
    this.props.dispatch(actions.showNotification(`Copied ${gif.url}`));
  };
  
  render() {
    const {gifs, isFetching, query, error} = this.props;
    
    let content;
    if (query.trim().length === 0) {
      content = <EmptyPlaceholder msg="Search something like 'Adventure time' "/>
    } else if (isFetching) {
      content = <LoadingIndicator/>
    } else if (error) {
      content = <ErrorMessage msg={error}/>
    } else if (gifs.length === 0) {
      content = <EmptyPlaceholder msg="No results. Search for something else."/>
    } else {
      content = <GifList items={gifs} onToggleFav={this.onToggleFav} onCopy={this.onCopy}/>
    }
    
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

const mapStateToProps = state => {
  
  const gifs = _.map(state.search.data, id => {
    return {
      isFavorite: state.favorites.present[id],
      ...state.gifs[id]
    };
  });
  
  return {
    query: state.search.query,
    isFetching: state.search.isFetching,
    gifs,
    error: state.search.error
  }
};

export default connect(mapStateToProps)(Search)

