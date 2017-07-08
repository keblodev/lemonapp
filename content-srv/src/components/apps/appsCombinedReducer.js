import { combineReducers } from 'redux';
import rootSampleAppReducer from "./sampleapp/reducers";

const rootAppsReducer = combineReducers({  
  rootSampleAppReducer
});

export default rootAppsReducer;
