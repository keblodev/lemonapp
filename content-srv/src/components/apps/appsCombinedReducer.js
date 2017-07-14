import { combineReducers } from 'redux';
import rootSampleAppReducer from "./sampleapp/reducers";
import rootFeedrizerAppReducer from "./feedrizer/reducers";

const rootAppsReducer = combineReducers({
  rootSampleAppReducer,
  rootFeedrizerAppReducer
});

export default rootAppsReducer;