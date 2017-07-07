import { combineReducers } from 'redux';
import navigation from "./navigation";

import rootAppsReducer from "../components/apps/appsCombinedReducer";

const rootReducer = combineReducers({  
  navigation,
  rootAppsReducer
});

export default rootReducer;
