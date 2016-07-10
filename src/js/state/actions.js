import _ from "lodash";
import store from "./store";

export const CHANGE_TAB = "CHANGE_TAB";
export const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_ERROR = "FETCH_SEARCH_ERROR";
export const FETCH_FAVORITES_REQUEST = "FETCH_FAVORITES_REQUEST";
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS";
export const FETCH_FAVORITES_ERROR = "FETCH_FAVORITES_ERROR";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";
export const UNDO = "UNDO";

export const changeTab = tab => ({type: CHANGE_TAB, tab: tab});

export const fetchSearch = (query) => async(dispatch) => {
  try {
    dispatch({type: FETCH_SEARCH_REQUEST, query});
    
    if(query.trim().length === 0) {
      return dispatch({type: FETCH_SEARCH_SUCCESS, data: []});
    }
    
    const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`;
    const response = await fetch(url);
    const body = await response.json();
    
    dispatch({type: FETCH_SEARCH_SUCCESS, data: body.data})
  } catch (e) {
    dispatch({type: FETCH_SEARCH_ERROR, error: e});
  }
};


export const fetchFavorites = () => async(dispatch) => {
  try {
    dispatch({type: FETCH_FAVORITES_REQUEST});
  
    const state = store.getState();
    const favoritesIds = _.keys(state.favorites.ids);
    const gifsToFetch = _.filter(favoritesIds, id => !state.gifs[id]);
  
    if (gifsToFetch.length === 0) { // all ids already fetched
      return dispatch({type: FETCH_FAVORITES_SUCCESS, data: []});
    }
    
    const url = `http://api.giphy.com/v1/gifs?ids=${gifsToFetch.join(",")}&api_key=dc6zaTOxFJmzC`;
    const response = await fetch(url);
    const body = await response.json();
    
    dispatch({type: FETCH_FAVORITES_SUCCESS, data: body.data})
  } catch (e) {
    dispatch({type: FETCH_FAVORITES_ERROR, error: e});
  }
};

export const showNotification = msg => dispatch => {
  dispatch({type: SHOW_NOTIFICATION, msg, visible: true});
  hideNotification(dispatch);
};

const hideNotification = _.debounce(dispatch => {
  dispatch({type: HIDE_NOTIFICATION});
}, 3000);

export const undo = () => dispatch => {
  const state = store.getState();
  if (state.favorites.past.length > 0) {
    dispatch({type: UNDO});
    dispatch(showNotification("Undo!"));
  }
};

export const toggleFav = id => ({type: TOGGLE_FAVORITE, id});
