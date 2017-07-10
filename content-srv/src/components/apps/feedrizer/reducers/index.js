import { combineReducers } from 'redux';
import navigation from "./navigation";
import tempReducerTest from "./tempReducerTest";

const rootFeedrizerAppReducer = combineReducers({  
  navigation,
  tempReducerTest
});

export default rootFeedrizerAppReducer;
