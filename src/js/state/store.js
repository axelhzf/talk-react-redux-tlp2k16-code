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
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
