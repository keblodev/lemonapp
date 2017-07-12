import { combineReducers } from 'redux';
import menuNavigation from "./menuNavigation";

import rootAppsReducer from "../components/apps/appsCombinedReducer";

const rootReducer = combineReducers({
  menuNavigation,
  rootAppsReducer
});

export default rootReducer;
