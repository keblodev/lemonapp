import { combineReducers } from 'redux';
import rootPodcastFeedAppReducer from "./podcastfeed/reducers";

const rootAppsReducer = combineReducers({  
  rootPodcastFeedAppReducer
});

export default rootAppsReducer;
