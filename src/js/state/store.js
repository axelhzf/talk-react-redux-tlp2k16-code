import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk'
import {storeState, getStoredState} from "./localStorage";

const store = {};

export default store;
