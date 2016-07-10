import update from 'immutability-helper';
import * as actions from "./actions";
import _ from "lodash";

export default function reducer(state, action) {
  switch (action.type) {
    case actions.CHANGE_TAB:
      return update(state, {
        tabs: {
          active: {$set: action.tab}
        }
      });
  
    case actions.FETCH_SEARCH_REQUEST:
      return update(state, {
        search: {
          $merge: {
            query: action.query,
            isFetching: true,
            error: undefined,
            data: []
          }
        }
      });
  
    case actions.FETCH_SEARCH_SUCCESS:
      const gifs = _.map(action.data, (gif) => ({id: gif.id, url: gif.images.fixed_height.url}));
      const gifsById = _.keyBy(gifs, "id");
      const ids = _.keys(gifsById);
      return update(state, {
        search: {
          $merge: {
            isFetching: false,
            data: ids
          }
        },
        gifs: {$merge: gifsById}
      });
  
    case actions.FETCH_SEARCH_ERROR:
      return update(state, {
        search: {
          $merge: {
            isFetching: false,
            error: action.error.message
          }
        }
      });
  
    case actions.FETCH_FAVORITES_REQUEST:
      return update(state, {
        favorites: {
          $merge: {
            isFetching: true,
            error: undefined,
            data: []
          }
        }
      });
  
    case actions.FETCH_FAVORITES_SUCCESS: {
      const gifs = _.map(action.data, (gif) => ({id: gif.id, url: gif.images.fixed_height.url}));
      const gifsById = _.keyBy(gifs, "id");
      return update(state, {
        favorites: { $merge: {isFetching: false} },
        gifs: {$merge: gifsById}
      });
    }
  
    case actions.FETCH_FAVORITES_ERROR:
      return update(state, {
        favorites: {
          $merge: {
            isFetching: false,
            error: action.error.message
          }
        }
      });
  
    case actions.TOGGLE_FAVORITE:
      const id = action.id;
      const isFavorite = state.favorites.ids[id];
      const newValue = isFavorite ?
        _.omit(state.favorites.ids, id) :
      {[id]: true, ...state.favorites.ids};
    
      return update(state, {
        favorites: {
          ids: {$set: newValue},
        }
      });
  
    case actions.SHOW_NOTIFICATION:
      return update(state, {
        notification: {
          $set: {
            msg: action.msg,
            visible: true
          }
        }
      });
  
    case actions.HIDE_NOTIFICATION:
      return update(state, {
        notification: {
          visible: {$set: false}
        }
      });
    
  }
  return state;
}
