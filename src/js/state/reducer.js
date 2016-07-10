import update from 'immutability-helper';
import * as actions from "./actions";
import _ from "lodash";

export default function reducer(state, action) {
  switch (action.type) {
    case actions.CHANGE_TAB:
      const newState = _.cloneDeep(state);
      newState.tabs.active = action.tab;
      return newState;
  }
  return state;
}
