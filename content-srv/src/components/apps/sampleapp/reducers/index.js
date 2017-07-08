import { combineReducers } from 'redux';
import navigation from "./navigation";
import tempReducerTest from "./tempReducerTest";

const rootPodcastFeedAppReducer = combineReducers({  
  navigation,
  tempReducerTest
});

export default rootPodcastFeedAppReducer;
