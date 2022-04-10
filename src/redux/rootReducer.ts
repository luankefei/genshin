import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";

import adminReducer from "../Container/Artifact/artifact.reducer";

// Initial routing state
const routeInitialState = {
  location: null,
};

const rootReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};

export default function createReducer() {
  return combineReducers({
    route: rootReducer,
    artifact: artifactReducer,
    // admin: adminReducer
  });
}
