import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk'
import {storeState, getStoredState} from "./localStorage";

const initialState = {
  tabs: {
    active: "search"
  },
  gifs: {
    
  },
  search: {
    query: "",
    isFetching: false,
    data: [],
    error: undefined
  },
  favorites: {
    isFetching: false,
    error: undefined,
    ids: {}
  },
  notification: {
    visible: false,
    msg: ""
  }
};

const store = createStore(
  reducer,
  _.merge(initialState, getStoredState()),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(_.throttle(() => {
  const state = store.getState();
  storeState({
    tabs: state.tabs,
    favorites: {
      ids: state.favorites.ids
    }
  });
}, 1000));


export default store;
