import _ from "lodash";
import store from "./store";

export const CHANGE_TAB = "CHANGE_TAB";
export const changeTab = tab => ({type: CHANGE_TAB, tab: tab});

